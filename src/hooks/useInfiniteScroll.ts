import { useState, useEffect } from "react";
import { Pagination } from "../constants/ApplicationConstants/ReportConstant";

/* starting will be from 1st page with 100 results per page. */
const startPage = 1;
const startPageSize = Pagination.PAGE_SIZE;

/* custom hook for infinite scrolling functionality  */
const useInfiniteScroll = (reportsDataLength: number, observerTarget: any, handleNextResultSet: (page: number, pageSize: number) => Promise<boolean>, isLoading: boolean) => {
  /* STATE */
  const [page, setPage] = useState(startPage);
  const [pageSize, setPageSize] = useState(startPageSize);
  const [loading, setLoading] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);

  /* HANDLERS */
  const handleDefault = () => {
    setPage(startPage);
    setPageSize(startPageSize);
    setLoading(false);
    setIsIntersecting(false);
  };

  const handleLoading = (value: boolean) => {
    setLoading(value);
  };

  const handlePageIncrement = () => {
    setPage((prevState: number) => prevState + 1);
  };

  const handleElementInViewPort = () => {
    setIsIntersecting(true);
  };

  const handleElementOutOfViewPort = () => {
    setIsIntersecting(false);
  };

  /* EFFECTS */
  useEffect(() => {
    /* 
       if the page is initially mounted we do not use or call the API, as on component mount initial API is called,
       we will only call the API for page 2,3,4 and so on or when intersection is met with the specified element.
       reason being as sson as the page is loaded for lesser entries the next-page element is exposed and
       API call is made which results in no more entries.
    */

    if (!isIntersecting || reportsDataLength < Pagination.PAGE_SIZE) return;
    handleLoading(true);

    /* for first render check if 1st page all entries are fetched, if not we do not increment page. */
    const nextPage = reportsDataLength < Pagination.PAGE_SIZE ? page : page + 1;
    console.log("nextPage", nextPage);
    handleNextResultSet(nextPage, pageSize)
      .then((res) => {
        /* if boolean return is true we increment the page */
        if (res) handlePageIncrement();
      })
      .finally(() => {
        handleLoading(false);
        handleElementOutOfViewPort();
      });
  }, [isIntersecting]);

  useEffect(() => {
    /* if reportsDataLength is not there it means first page was not loaded/no entries.*/
    if (!observerTarget || !reportsDataLength) return;
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting) {
          handleElementInViewPort();
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) observer.observe(observerTarget.current);

    return () => {
      if (observerTarget.current) observer.unobserve(observerTarget.current);
    };
  }, [observerTarget, isLoading, reportsDataLength]);

  return { loading, handleDefault };
};

export default useInfiniteScroll;
