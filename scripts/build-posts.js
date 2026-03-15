import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

// 创建dist目录
const distDir = path.join(process.cwd(), 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// 读取posts目录
const postsDir = path.join(process.cwd(), 'content', 'posts');
const postFiles = fs.readdirSync(postsDir);

// 解析所有Markdown文件
const posts = postFiles.map((file) => {
  const filePath = path.join(postsDir, file);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  const htmlContent = marked(content);
  
  return {
    ...data,
    content: htmlContent,
    slug: file.replace('.md', ''),
  };
});

// 生成posts数据文件
const postsData = JSON.stringify(posts, null, 2);
fs.writeFileSync(path.join(distDir, 'posts.json'), postsData);

// 生成首页HTML
const indexHtml = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>我的博客</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f5f5f5;
    }
    
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    header {
      margin-bottom: 2rem;
      text-align: center;
    }
    
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: #2c3e50;
    }
    
    .subtitle {
      font-size: 1.2rem;
      color: #7f8c8d;
    }
    
    .post-list {
      list-style: none;
    }
    
    .post-item {
      background-color: #fff;
      padding: 1.5rem;
      margin-bottom: 1rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease;
    }
    
    .post-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    .post-title {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    
    .post-title a {
      color: #2c3e50;
      text-decoration: none;
    }
    
    .post-title a:hover {
      color: #3498db;
    }
    
    .post-meta {
      font-size: 0.9rem;
      color: #7f8c8d;
      margin-bottom: 1rem;
    }
    
    .post-excerpt {
      color: #555;
      margin-bottom: 1rem;
    }
    
    .read-more {
      display: inline-block;
      padding: 0.5rem 1rem;
      background-color: #3498db;
      color: #fff;
      text-decoration: none;
      border-radius: 4px;
      transition: background-color 0.2s ease;
    }
    
    .read-more:hover {
      background-color: #2980b9;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>我的博客</h1>
      <p class="subtitle">分享知识与见解</p>
    </header>
    
    <ul class="post-list">
      ${posts.map((post) => `
        <li class="post-item">
          <h2 class="post-title"><a href="/posts/${post.slug}.html">${post.title}</a></h2>
          <p class="post-meta">${post.date} · ${post.author}</p>
          <p class="post-excerpt">${post.description}</p>
          <a href="/posts/${post.slug}.html" class="read-more">阅读更多</a>
        </li>
      `).join('')}
    </ul>
  </div>
</body>
</html>
`;

fs.writeFileSync(path.join(distDir, 'index.html'), indexHtml);

// 生成posts目录
const postsDistDir = path.join(distDir, 'posts');
if (!fs.existsSync(postsDistDir)) {
  fs.mkdirSync(postsDistDir);
}

// 为每个帖子生成HTML文件
posts.forEach((post) => {
  const postHtml = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${post.title} - 我的博客</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f5f5f5;
    }
    
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    header {
      margin-bottom: 2rem;
      text-align: center;
    }
    
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: #2c3e50;
    }
    
    .subtitle {
      font-size: 1.2rem;
      color: #7f8c8d;
      margin-bottom: 2rem;
    }
    
    .post-content {
      background-color: #fff;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .post-content h2 {
      font-size: 1.8rem;
      margin-top: 2rem;
      margin-bottom: 1rem;
      color: #2c3e50;
    }
    
    .post-content h3 {
      font-size: 1.4rem;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
      color: #34495e;
    }
    
    .post-content p {
      margin-bottom: 1rem;
    }
    
    .post-content ul, .post-content ol {
      margin-bottom: 1rem;
      padding-left: 2rem;
    }
    
    .post-content li {
      margin-bottom: 0.5rem;
    }
    
    .post-content code {
      background-color: #f8f8f8;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-family: 'Courier New', Courier, monospace;
      font-size: 0.9rem;
    }
    
    .post-content pre {
      background-color: #f8f8f8;
      padding: 1rem;
      border-radius: 4px;
      overflow-x: auto;
      margin-bottom: 1rem;
    }
    
    .post-content pre code {
      background-color: transparent;
      padding: 0;
    }
    
    .post-content blockquote {
      border-left: 4px solid #3498db;
      padding-left: 1rem;
      margin: 1rem 0;
      font-style: italic;
      color: #7f8c8d;
    }
    
    .post-content img {
      max-width: 100%;
      height: auto;
      margin: 1rem 0;
      border-radius: 4px;
    }
    
    .post-content table {
      width: 100%;
      border-collapse: collapse;
      margin: 1rem 0;
    }
    
    .post-content th, .post-content td {
      border: 1px solid #ddd;
      padding: 0.5rem;
      text-align: left;
    }
    
    .post-content th {
      background-color: #f8f8f8;
    }
    
    .back-home {
      display: inline-block;
      margin-top: 2rem;
      padding: 0.5rem 1rem;
      background-color: #3498db;
      color: #fff;
      text-decoration: none;
      border-radius: 4px;
      transition: background-color 0.2s ease;
    }
    
    .back-home:hover {
      background-color: #2980b9;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>${post.title}</h1>
      <p class="subtitle">${post.date} · ${post.author}</p>
    </header>
    
    <div class="post-content">
      ${post.content}
    </div>
    
    <a href="/" class="back-home">返回首页</a>
  </div>
</body>
</html>
`;
  
  fs.writeFileSync(path.join(postsDistDir, `${post.slug}.html`), postHtml);
});

console.log('静态博客生成完成！');
