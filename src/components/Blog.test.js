import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  let container
  const upvoteBlog = jest.fn()

  beforeEach(() => {
    container = render(
      <Blog
        blog={{
          title: 'some title for test',
          author: 'test author',
          url: 'url',
        }}
        upvoteBlog={upvoteBlog}
      />,
    ).container
  })

  test('by default only the author and the title are diplayed', () => {
    const div = screen.getByText('some title for test by test author')
    const div2 = container.querySelector('.blog-expanded')
    expect(div).not.toHaveStyle('display: none')
    expect(div2).toHaveStyle('display: none')
  })

  test('the ohter details of a blog are shown when the view button is getting clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const divOfBlogShrinked = container.querySelector('.blog-shrinked')
    const divOfBlogExpanded = container.querySelector('.blog-expanded')
    expect(divOfBlogShrinked).toHaveStyle('display: none')
    expect(divOfBlogExpanded).not.toHaveStyle('display: none')
  })

  test(' if the like button is clicked twice, the event handler is called twice.', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(upvoteBlog.mock.calls).toHaveLength(2)
  })
})
