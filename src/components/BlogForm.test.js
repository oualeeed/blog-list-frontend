import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('<BlogFrom />', () => {
  test('', async () => {
    const createBlog = jest.fn()
    render(<BlogForm createBlog={createBlog} />)

    const blog = {
      title: 'title for test',
      author: 'author for test',
      url: 'url for test',
    }
    const title = screen.getByPlaceholderText('Title of the article')
    const author = screen.getByPlaceholderText('author')
    const url = screen.getByPlaceholderText('url...')
    const create = screen.getByText('Create')

    const user = userEvent.setup()
    await user.type(title, blog.title)
    await user.type(author, blog.author)
    await user.type(url, blog.url)
    await user.click(create)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual(blog)
  })
})
