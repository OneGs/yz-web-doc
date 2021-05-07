import { Random } from 'mockjs'
import {mockObject} from "../tools/mock";

export function userPaging(params) {
    const temp = []

    for(let i = 0; i < 10; i++) {
        temp.push({
            name: Random.first(),
            account: Random.string(5, 7),
            describtion: Random.paragraph(1, 2),
            sex: Random.integer(0, 1) ? '男' : '女',
        })
    }

    return mockObject(temp)
}
