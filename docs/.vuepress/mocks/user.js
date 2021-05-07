import { Random } from 'mockjs'
import {mockObject} from "../tools/mock";

export function userPaging(params) {
    const temp = []

    const { sex, name, pageSize, pageIndex } = params

    for(let i = 0; i < pageSize; i++) {
        temp.push({
            name: name ? name : Random.first(),
            account: Random.string(5, 7),
            describtion: Random.paragraph(1, 2),
            sex: sex ? sex : Random.integer(0, 1) ? '男' : '女',
            index: pageIndex * pageSize + i
        })
    }

    return mockObject(temp)
}
