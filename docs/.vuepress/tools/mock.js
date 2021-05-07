export function mockObject(data, params = {}) {
    return {
        ok: true,
        err: {message: 'nice'},
        data,
        pageIndex: parseInt(params.pageIndex) || 1,
        pageSize: parseInt(params.pageSize) || 10,
        pageTotal: 65
    }
}
