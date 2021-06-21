import React, { FC, Fragment, ReactElement, MouseEvent } from 'react';
import cn from 'classnames';

import { GET_ERROR_MESSAGE } from 'constants/errorConstants';
import { PAGINATION_CONSTANTS, STATUSES } from 'constants/paginationConstants';
import './pagination.scss';

interface IPagination {
  boundaryPagesRange?: number,
  currentPage: number,
  siblingPagesRange?: number,
  totalPages: number,
  onPageChange(page: number | null): void,
}

const Pagination: FC<IPagination> = ({
  boundaryPagesRange = 1,
  currentPage,
  siblingPagesRange = 1,
  totalPages,
  onPageChange,
}): ReactElement => {
  const onChange = (event: MouseEvent<HTMLSpanElement>, page: number | null): void => {
    event.stopPropagation();
    onPageChange(page);
  };

  const createPageNav = (
    label: string,
    status: STATUSES | '',
    pageNumber: number | null = null,
    navClass?: string
  ): ReactElement => (
    <span
      className={cn('page', navClass, status)}
      onClick={event => onChange(event, pageNumber)}
    >
      {label}
    </span>
  );

  const showPreviousNav = (currentPage: number): ReactElement => {
    const label = PAGINATION_CONSTANTS.PREV;
    const status = currentPage === 1 ? STATUSES.NAV_STATUS_DISABLED : '';
    const pageNumber = currentPage === 1 ? currentPage : currentPage - 1;

    return createPageNav(label, status, pageNumber, 'prev');
  };

  const showNextNav = (currentPage: number, totalPages: number): ReactElement => {
    const label = PAGINATION_CONSTANTS.NEXT;
    const status = currentPage === totalPages ? STATUSES.NAV_STATUS_DISABLED : '';
    const pageNumber = currentPage === totalPages ? totalPages : currentPage + 1;

    return createPageNav(label, status, pageNumber, 'next');
  };

  const createRange = (start: number, end: number): number[] => {
    const range = [];

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  const createPageNavPagination = (range: number[]): ReactElement[] => (
    range.map(pageNumber => {
      const label = pageNumber.toString();
      const status = currentPage === pageNumber
        ? STATUSES.NAV_STATUS_ACTIVE
        : STATUSES.NAV_STATUS_INACTIVE;

      return createPageNav(label, status, pageNumber);
    })
  );

  const createEllipsis = (): ReactElement => {
    const label = PAGINATION_CONSTANTS.ELLIPSIS;

    return createPageNav(label, STATUSES.NAV_STATUS_UNCLICKABLE);
  };

  const validatePagesOptions = (
    totalPages: number,
    currentPage: number,
    boundaryPagesRange: number,
    siblingPagesRange: number
  ): string[] => {
    const errorMessages= [];

    if (totalPages < 0)
      errorMessages.push(
        GET_ERROR_MESSAGE.NOT_NEGATIVE_NUMBER(PAGINATION_CONSTANTS.TOTAL_PAGES, totalPages)
      );

    if (currentPage < 0)
      errorMessages.push(
        GET_ERROR_MESSAGE.NOT_NEGATIVE_NUMBER(PAGINATION_CONSTANTS.CURRENT_PAGE, currentPage)
      );

    if (currentPage > totalPages)
      errorMessages.push(
        GET_ERROR_MESSAGE.NOT_GREATER(
          PAGINATION_CONSTANTS.CURRENT_PAGE, PAGINATION_CONSTANTS.TOTAL_PAGES, currentPage, totalPages
        )
      );

    if (boundaryPagesRange < 0)
      errorMessages.push(
        GET_ERROR_MESSAGE.NOT_NEGATIVE_NUMBER(PAGINATION_CONSTANTS.BOUNDARY_PAGES_RANGE, boundaryPagesRange)
      );

    if (siblingPagesRange < 0)
      errorMessages.push(
        GET_ERROR_MESSAGE.NOT_NEGATIVE_NUMBER(PAGINATION_CONSTANTS.SIBLING_PAGES_RANGE, siblingPagesRange)
      );

    return errorMessages;
  };

  const shouldRenderAllPages = (ellipsisSize: number): boolean => (
    1 + 2 * ellipsisSize + 2 * siblingPagesRange + 2 * boundaryPagesRange >= totalPages
  );

  const createPages = (pagesStart: number, pagesEnd: number): ReactElement[] => {
    const pages = createRange(pagesStart, pagesEnd);

    return createPageNavPagination(pages);
  };

  const defineEllipsis = (ellipsisPageNumber: number, pagesEnd: number) => {
    const showPageInsteadOfEllipsis = ellipsisPageNumber === pagesEnd;

    const status = currentPage === ellipsisPageNumber
      ? STATUSES.NAV_STATUS_ACTIVE
      : STATUSES.NAV_STATUS_INACTIVE;

    return showPageInsteadOfEllipsis
      ? createPageNav(
        ellipsisPageNumber.toString(),
        status,
        ellipsisPageNumber
      )
      : createEllipsis();
  };

  const createPaginationModel = (): ReactElement[] => {
    const ellipsisSize = 1;
    const paginationModel: ReactElement[] = [];

    const errorMessages = validatePagesOptions(
      totalPages,
      currentPage,
      boundaryPagesRange,
      siblingPagesRange
    );

    if (errorMessages.length) {
      errorMessages.forEach(message => console.error(message));

      return paginationModel;
    }

    paginationModel.push(showPreviousNav(currentPage));

    if (shouldRenderAllPages(ellipsisSize)) {
      const allPages = createPages(1, totalPages);

      paginationModel.push(...allPages);
    } else {
      const firstPagesStart = 1;
      const firstPagesEnd = boundaryPagesRange;
      const firstPages = createPages(firstPagesStart, firstPagesEnd);

      const lastPagesStart = totalPages + 1 - boundaryPagesRange;
      const lastPagesEnd = totalPages;
      const lastPages = createPages(lastPagesStart, lastPagesEnd);

      const mainPagesStart = Math.min(
        Math.max(
          currentPage - siblingPagesRange,
          firstPagesEnd + ellipsisSize + 1
        ),
        lastPagesStart - ellipsisSize - 2 * siblingPagesRange - 1
      );
      const mainPagesEnd = mainPagesStart + 2 * siblingPagesRange;
      const mainPages = createPages(mainPagesStart, mainPagesEnd);

      const firstEllipsis = defineEllipsis(mainPagesStart - 1, firstPagesEnd + 1);
      const secondEllipsis = defineEllipsis(mainPagesEnd + 1, lastPagesStart - 1);

      paginationModel.push(...firstPages);
      paginationModel.push(firstEllipsis);
      paginationModel.push(...mainPages);
      paginationModel.push(secondEllipsis);
      paginationModel.push(...lastPages);
    }

    paginationModel.push(showNextNav(currentPage, totalPages));

    return paginationModel;
  };

  const showPagination = () => {
    const pages = createPaginationModel();

    return pages.map((page, index) => <Fragment key={index}>{page}</Fragment>);
  };

  return <div className='pagination'>{showPagination()}</div>;
};

export default Pagination;
