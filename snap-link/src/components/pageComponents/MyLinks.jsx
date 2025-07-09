import React, { useState,useEffect } from 'react';
import MyLinksCard from '../MyLinksCard';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../utils/axios';
import { fetchMoreLinks } from '../../utils/redux/myLinksSlice';

function MyLinks() {
  
  const myLinks = useSelector(state => state?.links?.links);
  console.log(myLinks);
  
  const { limit, currentPage } = useSelector(state => state?.links);
  const [hasMore, setHasMore] = useState(true);
  const [links, setLinks] = useState(myLinks);
  const dispatch = useDispatch();


  useEffect(() => {
    setLinks(myLinks);
  }, [myLinks,dispatch]);

  const fetchMore = async () => {
    try {
      const linksRes = await axiosInstance.get(`/links/my-links?p=${currentPage}&l=${limit}`);
      const moreLinks = linksRes?.data?.data?.links || [];
      console.log("Fetched more links:", moreLinks);
      console.log("currentPage", currentPage);

      if (moreLinks.length <= 0) {
        setHasMore(false);
        return;
      }
      dispatch(fetchMoreLinks(moreLinks));
    } catch (error) {
      console.error("Error fetching more links", error);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen w-full">
      <div className="hero-content min-h-screen w-full items-start pt-7">
        <div className="max-w-xl w-full">
          <ul className="list rounded-box items-center gap-5 overflow-y-scroll h-screen ">
            {links.length > 0 ? (
              links.map((e) => (
                <li key={e._id} className=" p-4 rounded-xl shadow-md border flex  flex-col gap-2 w-[90%]">
                  <MyLinksCard data={e} />
                </li>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-gray-400">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-12 w-12 mb-3 text-gray-300"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6h6v6h4V9H5v8h4z" />
  </svg>
  <p className="text-center text-lg">No links available</p>
</div>

            )}
            {hasMore && (
              <button className="btn btn-primary" onClick={fetchMore}>
                More
              </button>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MyLinks;
