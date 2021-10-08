// core
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

// component
import Blog from './Blog'


const blog = {
  title: 'Blog testing',
  author: 'Luciano',
  link: 'https://localhost',
  likes: 0,
}

test('Renders title but not the description', () => {

  const update = jest.fn()
  const remove = jest.fn()

  const component = render(
    <Blog blog={blog} update={update} remove={remove} />
  )
  const descriptionDiv = component.container.querySelector('.blog-description')

  // Title visible
  expect(component.container).toHaveTextContent(blog.title)

  // Description (author, link and likes) hidden
  expect(descriptionDiv).toHaveStyle('display: none')
})

test('Clicking "show" button makes the description visible', () => {

  const update = jest.fn()
  const remove = jest.fn()

  const component = render(
    <Blog blog={blog} update={update} remove={remove} />
  )
  const button = component.container.querySelector('button')
  const descriptionDiv = component.container.querySelector('.blog-description')

  // button shows the description when pressed
  expect(button).toHaveTextContent('show')

  fireEvent.click(button)

  // We expect to have the description rendered
  expect(descriptionDiv).not.toHaveStyle('display: none')
  // and the button text changed
  expect(button).toHaveTextContent('hide')
})

test('Clicking "like" button twice calls the event handler twice', () => {
  const update = jest.fn()
  const remove = jest.fn()

  const component = render(
    <Blog blog={blog} update={update} remove={remove} />
  )
  const button = component.container.querySelector('.like-button')

  expect(button).toHaveTextContent('like')

  // Clicked twice
  fireEvent.click(button)
  fireEvent.click(button)

  expect(update.mock.calls).toHaveLength(2)
})