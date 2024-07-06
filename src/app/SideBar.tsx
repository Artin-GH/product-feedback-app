"use client";
import styles from "./styles/SideBar.module.css";
import Image from "next/image";
import { cls } from "@/helpers";
import Link from "next/link";
import { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { ICategoryProps } from "@/models/category";

const SideBar: React.FC<{categories: ICategoryProps[]}> = (props) => {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isHamburgerMenuOpen}
      timeout={600}
      classNames={{
        enter: cls(styles.animEnter, styles.animOnPage),
        enterActive: styles.animEnterActive,
        enterDone: styles.animOnPage,
        exit: cls(styles.animExit, styles.animOnPage),
        exitActive: styles.animExitActive,
      }}
    >
      <aside className={styles.sidebar} ref={nodeRef}>
        <div className={styles.gradientCon}>
          <div className={styles.gradient}>
            <div className={`${styles.gradientContent} body-md`}>
              <h2 className="heading-lg">Frontend Mentor</h2>
              <p className={styles.gradientDesc}>Feedback Board</p>
            </div>
            <div
              className={cls(
                styles.hamburger,
                isHamburgerMenuOpen ? "active" : null
              )}
              onClick={() => {
                setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
              }}
            >
              <div className={styles.hamburgerLine}></div>
              <div className={styles.hamburgerLine}></div>
              <div className={styles.hamburgerLine}></div>
            </div>
            <Image
              src="/suggestions/desktop/background-header.png"
              fill
              alt="gradient"
            />
          </div>
        </div>
        <div
          className={styles.sidebarBackdrop}
          onClick={() => {
            setIsHamburgerMenuOpen(false);
          }}
        ></div>
        <div className={styles.sidebarContent}>
          <Categories categories={props.categories} />
          <div className={styles.roadmap}>
            <div className={`${styles.roadmapTop} body-xs`}>
              <h2 className="heading-md-tablet">Roadmap</h2>
              <Link href="/roadmap" className={styles.roadmapView}>
                View
              </Link>
            </div>
            <div className={styles.roadmapItems}>
              <div className={styles.roadmapItem}>
                <div className={`${styles.roadmapItemCircle} bg-tacao`}></div>
                <span className="body-lg-tablet">Planned</span>
                <strong className={styles.roadmapItemCount}>2</strong>
              </div>
              <div className={styles.roadmapItem}>
                <div
                  className={`${styles.roadmapItemCircle} bg-electro-violet`}
                ></div>
                <span className="body-lg-tablet">In-Progress</span>
                <strong className={styles.roadmapItemCount}>3</strong>
              </div>
              <div className={styles.roadmapItem}>
                <div className={`${styles.roadmapItemCircle} bg-malibu`}></div>
                <span className="body-lg-tablet">Live</span>
                <strong className={styles.roadmapItemCount}>1</strong>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </CSSTransition>
  );
};

const Categories: React.FC<{categories: ICategoryProps[]}> = ({categories}) => {
  return (
    <div className={`${styles.tags} body-xs`}>
      <div className={cls(styles.tagsTag, "badge", "active")}>All</div>
      {categories
        ? categories.map((category, i) => (
            <div className={cls(styles.tagsTag, "badge")} key={i}>
              {category.name}
            </div>
          ))
        : [1, 2, 3, 4, 5, 6].map((i) => (
            <div className={cls(styles.tagsTag, 'skeleton')} key={i}></div>
          ))}
    </div>
  );
};

export default SideBar;
