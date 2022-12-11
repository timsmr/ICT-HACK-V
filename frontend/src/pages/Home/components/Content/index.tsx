import React from "react";
import { SubBlock } from "./components/SubBlock";
import styles from "./index.module.scss";
import { ReactComponent as ChoKavo } from "./svgs/1.svg";
import { ReactComponent as Hernya1 } from "./svgs/2.svg";
import { ReactComponent as Hernya2 } from "./svgs/3.svg";
import { mainContentStudents, mainContentCompanies } from "./config";

export const Content = () => {
  return (
    <div className={styles.root}>
      <div className={styles.main__title}>
        <span className={styles.main__title_big}>
          ЦИФРОВАЯ
          <br />
          ПЛАТФОРМА
        </span>
        <span className={styles.main__title_smol}>ИТМО Х ПИШ</span>
      </div>
      <div className={styles.main__side_block}>
        <span className={styles.main__side_left}>
          Что это
          <br />и для кого?
        </span>
        <p className={styles.main__side_right}>
          ЦИФРОВАЯ ПЛАТФОРМА - новый проект передовой инженерной школы
          Университета ИТМО, нацеленный на построение профессиональных связей
          между студентами и крупными российскими компаниями
        </p>
        <ChoKavo className={styles.main__side_her} />
      </div>
      <SubBlock
        title={mainContentStudents.title}
        columns={mainContentStudents.columns}
      >
        <Hernya1 className={styles.hernya__1} />
      </SubBlock>
      <SubBlock
        title={mainContentCompanies.title}
        columns={mainContentCompanies.columns}
      >
        <Hernya2 className={styles.hernya__2} />
      </SubBlock>
    </div>
  );
};
