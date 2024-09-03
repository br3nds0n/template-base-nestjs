import { PaginationPresenter } from './pagination.presenter';

export abstract class CollectionPresenter {
  protected paginationPresenter: PaginationPresenter;

  constructor(props: PaginationPresenter) {
    this.paginationPresenter = new PaginationPresenter(props);
  }

  get meta() {
    return this.paginationPresenter;
  }

  abstract get data();
}
