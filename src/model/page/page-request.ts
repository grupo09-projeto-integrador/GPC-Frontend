
export class PageRequest {
    filter!: string
    currentPage!: number
    pageSize!: number

    sortField!: string
    direction!: string

    constructor() {
      this.currentPage = 0
      this.direction = 'asc'
    }

}