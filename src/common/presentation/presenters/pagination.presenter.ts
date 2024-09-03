export type PaginationPresenterProps = {
  currentPage: number;
  perPage: number;
  lastPage: number;
  total: number;
};

export class PaginationPresenter {
  currentPage: number;
  perPage: number;
  lastPage: number;
  total: number;

  constructor(props: PaginationPresenterProps) {
    this.currentPage = props.currentPage;
    this.perPage = props.perPage;
    this.lastPage = props.lastPage;
    this.total = props.total;
  }
}
