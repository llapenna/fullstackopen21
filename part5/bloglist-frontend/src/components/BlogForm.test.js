// core
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

// component
import BlogForm from './BlogForm'

test('Submitting form with specific arguments', () => {
  const blog = {
    title: 'Test blog',
    author: 'myself',
    url: 'https://localhost:3000'
  }

  const create = jest.fn()

  const component = render(
    <BlogForm create={create} />
  )
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  // We fill the inputs
  fireEvent.change(title, {
    target: { value: blog.title }
  })
  fireEvent.change(author, {
    target: { value: blog.author }
  })
  fireEvent.change(url, {
    target: { value: blog.url }
  })

  fireEvent.submit(form)

  expect(create.mock.calls).toHaveLength(1)
  expect(create.mock.calls[0][0]).toEqual(blog)
})