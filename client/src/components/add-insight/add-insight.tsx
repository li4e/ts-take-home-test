import { useState } from "react";
import { BRANDS } from "../../lib/consts.ts";
import { Button } from "../button/button.tsx";
import { Modal, type ModalProps } from "../modal/modal.tsx";
import styles from "./add-insight.module.css";
import { useCreateInsight } from "../../model/insight.ts";

type AddInsightProps = ModalProps;

export const AddInsight = (props: AddInsightProps) => {
  const createInsight = useCreateInsight();
  const [insightText, setInsightText] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(BRANDS[0].id);

  const onFormSubmit = async () => {
    if (!insightText) return;
    await createInsight(selectedBrand, insightText);
    props.onClose();
    setSelectedBrand(BRANDS[0].id);
    setInsightText("");
  };

  return (
    <Modal {...props}>
      <h1 className={styles.heading}>Add a new insight</h1>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          onFormSubmit();
        }}
      >
        <label className={styles.field}>
          <select
            className={styles["field-input"]}
            value={selectedBrand}
            onChange={(e) => {
              setSelectedBrand(Number(e.target.value));
            }}
          >
            {BRANDS.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          Insight
          <textarea
            value={insightText}
            onChange={(e) => {
              setInsightText(e.target.value);
            }}
            className={styles["field-input"]}
            rows={5}
            placeholder="Something insightful..."
          />
        </label>
        <Button className={styles.submit} type="submit" label="Add insight" />
      </form>
    </Modal>
  );
};
