import { useTranslation } from "react-i18next";
import "./StudentCourseCard.scss";

const FeeReferenceTable = () => {
  const [studentsTranslation] = useTranslation("students");

  return (
    <div className=" border border-black p-2 border-opacity-20 rounded  mt-2 ">
      <div className="  d-flex flex-row  ">
        <div className="bg-secondary border border-dark text-dark reference w-auto p-2 "></div>
        <div className=" ms-2 ">
          {studentsTranslation("students.feeReferenceTable.lateEntry")}
        </div>
      </div>
      <div className="  d-flex flex-row  ">
        <div className="bg-success border border-dark text-dark reference w-auto p-2 "></div>
        <div className=" ms-2 ">
          {studentsTranslation("students.feeReferenceTable.payedFee")}
        </div>
      </div>
      <div className="  d-flex flex-row ">
        <div className="bg-danger border border-dark reference w-auto p-2"></div>
        <div className="  ms-2 ">
          {studentsTranslation("students.feeReferenceTable.lateFee")}
        </div>
      </div>
      <div className=" d-flex flex-row ">
        <div className="bg-warning border border-dark reference w-auto p-2"></div>
        <div className="ms-2 ">
          {studentsTranslation("students.feeReferenceTable.currentFee")}
        </div>
      </div>
      <div className="  d-flex flex-row ">
        <div className=" bg-white border border-dark reference w-auto p-2"></div>
        <div className=" ms-2 ">
          {studentsTranslation("students.feeReferenceTable.incomingFees")}
        </div>
      </div>
      <div className=" d-flex flex-row">
        <div className="bg-success  bg-opacity-50 border border-dark border-2 reference w-auto p-2"></div>
        <div className=" ms-2 ">
          {studentsTranslation("students.feeReferenceTable.selectedFees")}
        </div>
      </div>
    </div>
  );
};

export default FeeReferenceTable;
