import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github.css'

function App() {
  const [markdown, setMarkdown] = useState(`# 欢迎使用Markdown博客

这是一个功能完整的Markdown编辑器，支持以下功能：

## 标题

# 一级标题
## 二级标题
### 三级标题

## 列表

- 无序列表项 1
- 无序列表项 2
  - 嵌套列表项

1. 有序列表项 1
2. 有序列表项 2

## 强调

**粗体文本**

*斜体文本*

## 链接

[GitHub](https://github.com)

## 图片

![示例图片](https://picsum.photos/200/300)

## 代码

行内代码

\`\`\`javascript
function hello() {
  console.log('Hello, world!');
}
\`\`\`

## 引用

> 这是一段引用文本

## 表格

| 表头 1 | 表头 2 |
| ------ | ------ |
| 单元格 1 | 单元格 2 |
| 单元格 3 | 单元格 4 |
`)

  return (
    <div className="container">
      <h1>Markdown博客编辑器</h1>
      <div className="editor-container">
        <textarea
          className="editor-textarea"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="在此输入Markdown内容..."
        />
        <div className="preview-container">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default App