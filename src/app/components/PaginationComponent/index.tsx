/*
 *
 * PaginationComponent
 *
 */
import { useMemo } from 'react';
import { Pagination } from 'react-bootstrap';

interface Props {
  page: number;
  handleChangePage: Function;
  count: number;
}

function pagination(c: number, m: number): number[] {
  var current = c,
    last = m,
    delta = 2,
    left = current - delta,
    right = current + delta + 1,
    range: number[] = [],
    rangeWithDots: number[] = [],
    l;

  for (let i = 1; i <= last; i++) {
    if (i === 1 || i === last || (i >= left && i < right)) {
      range.push(i);
    }
  }
  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        if (!rangeWithDots.includes(-1)) {
          rangeWithDots.push(-1);
        } else {
          rangeWithDots.push(-2);
        }
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
}

export default function PaginationComponent({ page, handleChangePage, count }: Props) {
  //======================== Hook ========================
  const arr: number[] = useMemo((): number[] => {
    return pagination(page, count);
  }, [page, count]);
  //======================== Render ========================
  return (
    <Pagination>
      <Pagination.First disabled={page === 1} onClick={() => handleChangePage(1)} />
      <Pagination.Prev disabled={page === 1} onClick={() => handleChangePage(page - 1)} />
      {arr.map(item =>
        item > -1 ? (
          <Pagination.Item
            key={item}
            active={item === page}
            onClick={() => {
              if (item !== page) {
                handleChangePage(item);
              }
            }}
          >
            {item}
          </Pagination.Item>
        ) : (
          <Pagination.Ellipsis key={item} disabled />
        ),
      )}
      <Pagination.Next disabled={page === count} onClick={() => handleChangePage(page + 1)} />
      <Pagination.Last disabled={page === count} onClick={() => handleChangePage(count)} />
    </Pagination>
  );
}
