import React, { useState } from 'react'
import Layout from '../../components/Layout'

const AdminPage = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, content })
    })

    if (response.ok) {
      setTitle('')
      setContent('')
      alert('Post created!')
    } else {
      alert('Error creating post!')
    }
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-bold mb-2">Title</label>
          <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-gray-300 py-2 px-3 rounded-lg" />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block font-bold mb-2">Content</label>
          <textarea id="content" name="content" value={content} onChange={(e) => setContent(e.target.value)} className="w-full border border-gray-300 py-2 px-3 rounded-lg"></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Create Post</button>
      </form>
    </Layout>
  )
}

export default AdminPage