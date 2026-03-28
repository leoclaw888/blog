# 踩坑 MNN 转 BERT 模型

> 记录一次 ONNX 转 MNN 后的推理误差排查过程

## 问题现象

使用以下命令测试 MNN 模型转换：

```bash
python3 ../tools/script/testMNNFromOnnx-ori.py /Users/xin/Documents/code/MNN/demo/zhongshu/final_bert_mnn.onnx DEBUG
```

**转换成功，但推理报错：**

```
Converted Success!
Check convert result by onnx, thredhold is 0.01
input_ids
attention_mask
output: logits
logits: (1, 8, )
TESTERROR logits value error : absMaxV:7.908714 - DiffMax 5.450233
Error for output logits
Save mnn result to .error director
```

- ✅ ONNX 推理正常
- ❌ MNN 模型推理误差巨大（`DiffMax` 高达 5.45+）

## 排查过程

### 第一步：数据类型检查

尝试将模型改为 `int32` 后重新测试，但误差值（`DiffMax` 依然是 3.7+）和出错位置几乎没变。

**结论：** 排除了最常见的"数据类型越界"问题。

### 第二步：定位问题层

错误追溯到了 `/bert/embeddings/Constant` 附近。

仔细观察日志，Layer.3 的输出 Shape 是 `(1, 512, 312)`，说明序列长度是 512。

## 核心原因

对于 BERT 模型，Embedding 层由三部分组成：

1. **Word Embeddings** - 词嵌入
2. **Position Embeddings** - 位置嵌入
3. **Token Type Embeddings (Segment)** - 段嵌入

问题出在 **Position/Token Type Embeddings 的动态生成**：

> 在 PyTorch 导出 ONNX 时，如果没有锁死 Shape，ONNX 会用 `Shape → Gather → ConstantOfShape` 这一串极其复杂的胶水算子来动态生成全 0 的 Segment ID。
>
> **MNN 经常无法正确处理 `ConstantOfShape` 或动态的 `Tile` 算子**，导致相加时混入了未初始化的内存（也就是随机的极大垃圾值），从而让整个激活值彻底崩坏。

## 解决方案

### 使用 onnxsim 锁死 Shape 并化简模型

```bash
# 确保安装了最新版的 onnxsim
pip install onnxsim

# 替换成你实际的 ONNX 文件名，强制指定 input_ids 和 attention_mask 的 Shape
onnxsim /Users/xin/Documents/code/MNN/demo/zhongshu/bert_mnn_final_int32.onnx \
        /Users/xin/Documents/code/MNN/demo/zhongshu/bert_mnn_sim.onnx \
        --overwrite-input-shape input_ids:1,512 attention_mask:1,512
```

### 重新测试

化简成功后，用新生成的 `bert_mnn_sim.onnx` 去跑 `testMNNFromOnnx.py`，问题应该就解决了。

## 经验总结

| 问题类型 | 症状 | 解决方案 |
|---------|------|---------|
| 数据类型越界 | DiffMax 异常大 | 检查并统一数据类型 |
| 动态 Shape 问题 | DiffMax 异常大，定位到 Embedding 层 | 用 onnxsim 锁死 Shape |
| 算子融合 Bug | 特定层输出异常 | 简化模型或调整转换参数 |

**关键要点：** 在导出 ONNX 时尽量锁死输入 Shape，避免使用动态算子，可以大幅降低 MNN 转换后的兼容性问题。

---

_记录时间：2026-03-27_
