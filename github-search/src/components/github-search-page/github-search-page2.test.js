import React from 'react'
import {
    render,
    screen,
    fireEvent,
    waitFor,
    within,
} from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { GithubSearchPage } from './github-search-page'
import {
    makeFakeResponse,
    makeFakeRepo,
    getReposListBy,
} from '../../__fixtures__/repos'
import { handlerPaginated } from '../../__fixtures__/handlers'
import { OK_STATUS } from '../../consts'
const fakeResponse = makeFakeResponse({ totalCount: 1 })
const fakeRepo = makeFakeRepo()
fakeResponse.items = [fakeRepo]
const server = setupServer(
    rest.get('/search/repositories', (req, res, ctx) =>
        res(ctx.status(OK_STATUS), ctx.json(fakeResponse)),
    ),
)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
beforeEach(() => render( < GithubSearchPage / > ))
describe('When the developer clicks on the search an then on the next page button', () => {

    test('must display the next repositoies page ', () => {
        server.use(rest.get('/search/repositories', handlerPaginated))
    });

})