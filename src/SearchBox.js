import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import InfiniteScroll from "react-infinite-scroll-component";
import { getImages, getSearchImages } from "./utility";
import { Gallery, Image, Header, SearchBoxInput } from "./StyledComponents";
import styles from "../src/Searchbox.module.css";

function Page() {
  const [searchText, setSearchText] = React.useState("");
  const [scrollCounter, setScrollCounter] = React.useState(1);
  const [images, setImages] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const images = await getImages();
      setImages(images);
    })();
  }, []);

  const fetchDataOnScroll = () => {
    (async () => {
      const imgs =
        searchText.length > 0
          ? await getSearchImages(searchText, scrollCounter + 1)
          : await getImages();

      if (searchText.length > 0) setScrollCounter(scrollCounter + 1);

      setImages(images.concat(imgs));
    })();
  };

  const fetchSearchData = () => {
    setScrollCounter(1);
    (async () => {
      const imgs = await getSearchImages(searchText, 1);

      setImages(imgs);
    })();
  };

  return (
    <>
      <Header className={`${styles.galleryHeading}`}>
        <h1 className="text-[50px] font-bold mt-[40px] pb-[40px]">
          Welcome to Image Gallery!
        </h1>
      </Header>

      <section className={`${styles.galleryText}`}>
        <p className="w-[70%] m-auto text-center font-medium text-[#808080]">
          This is a site in which we have used infinite scroll. The scroll is
          created in a way that when we first load the website it gives us the
          30 images as the count is 30. There is infinte scroll means when user
          scrolls the page the fetch request will trigger when it reaches to the
          25th image. This is the smooth scrolling technique.
        </p>
      </section>

      <div className={`${styles.galleryImages}`}>
        <InfiniteScroll
          dataLength={images?.length}
          next={fetchDataOnScroll}
          hasMore={true}
        >
          <Gallery>
            <ResponsiveMasonry>
              <Masonry gutter="10px">
                {images?.map((image, i) => (
                  <Image key={i} src={image} alt="images" />
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </Gallery>
        </InfiniteScroll>
      </div>
    </>
  );
}

export default Page;
