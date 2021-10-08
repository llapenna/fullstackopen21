// core
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

// component
import Blog from './Blog'

test('Renders title but not the description', () => {
  const blog = {
    title: 'Blog testing',
    author: 'Luciano',
    link: 'https://localhost',
    likes: 0,
  }

  const update = jest.fn()
  const remove = jest.fn()

  const component = render(
    <Blog blog={blog} update={update} remove={remove} />
  )
  const descriptionDiv = component.container.querySelector('blog-description')

  // Title visible
  expect(component.container).toHaveTextContent(blog.title)

  // Description (author, link and likes) hidden
  expect(descriptionDiv).toBe(null)
})