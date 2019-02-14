import { isAbsoluteUrl } from '../src/utils/rest/util'

it('判断url是否为绝对路径', () => {
  const case1 = 'https://www.baidu.com/'
  expect(isAbsoluteUrl(case1)).toBe(true)
})
