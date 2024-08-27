import pinyin from 'pinyin'

/**
 * 构造通讯录数据结构
 * @param nameList 用户名列表
 */
export function createDirectory(nameList: string[]) {
  const letters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ]

  const specialLetter = '#'
  const directoryMap = new Map()
  directoryMap.set(specialLetter, [])

  const isIn26Letters = (firstLetter: string) => letters.includes(firstLetter)

  nameList.forEach((name) => {
    const [[firstName]] = pinyin(name)
    const firstLetter: string = (firstName[0] as string).toUpperCase()

    //   若name不符合26个字母中任何一个，则放置在#中
    if (!isIn26Letters(firstLetter)) {
      const specialArr: string[] = directoryMap.get(specialLetter)
      specialArr.push(name)
    } else {
      const existLetter = directoryMap.has(firstLetter)
      if (!existLetter) {
        directoryMap.set(firstLetter.toUpperCase(), [])
      }
      const existArr = directoryMap.get(firstLetter)
      existArr.push(name)
    }
  })

  return directoryMap
}
