import IUnpayedAndFuturePeriods from "../../students/studentDetail/IStudentUnpayedAndFuturePeriods";
import IDiscount from "../IDiscount";
import IGroup from "../IGroup";
import GroupErrorNewStudent from "./GroupErrorNewStudent";
import IGroupValidationService from "./IGroupValidationService";
import { injectable } from "tsyringe";

@injectable()
export class GroupValidationService implements IGroupValidationService {
  validateName(
    name: string,
    groups: IGroup[]
  ) : {
    name: string;
  } {
    var existingGroup = groups.find((groups) => {
      return groups.name.trim().toLowerCase() === name.toLowerCase().trim();
    });

    let errors = { name: "" };
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;

    if (!name.trim()) {
      errors.name = "requerido";
    } else if (!regexName.test(name.trim())) {
      errors.name = "Sólo acepta letras y espacios en blanco";
    } else if (existingGroup !== undefined) {
      errors.name = name + " ya esta registrado";
    }

    return errors;
  }

  validateDiscount(
    amount: number,
    discount: number,
    discounts: IDiscount[]
  ): { newAmount: string | undefined; newDiscount: string | undefined } {
    let errors = { newAmount: "", newDiscount: "" };

    var existingAmount = discounts.find((discounts) => {
      return Number(amount) === discounts.integrantsAmount;
    });

    var existingDiscount = discounts.find((discounts) => {
      return discount === discounts.discountRate;
    });

    if (!amount) {
      errors.newAmount = "requerido";
    } else if (existingAmount !== undefined) {
      errors.newAmount = " ya esta registrado";
    }

    if (!discount) {
      errors.newDiscount = "requerido";
    } else if (existingDiscount !== undefined) {
      errors.newDiscount = discount + " ya esta registrado";
    }

    return errors;
  }
  validateNewStudentInGroup(
    studentSelectedDetail?: IUnpayedAndFuturePeriods,
    studentGroupDetail?: IUnpayedAndFuturePeriods
  ): GroupErrorNewStudent {
    let errors = new GroupErrorNewStudent();

    if (studentSelectedDetail && studentGroupDetail) {
      if (
        studentSelectedDetail.unpayedPeriods.length > 1 ||
        studentSelectedDetail.unpayedPeriods.length !==
          studentGroupDetail.unpayedPeriods.length ||
        studentSelectedDetail.futurePeriods.length !==
          studentGroupDetail.futurePeriods.length
      ) {
        errors.groupId = "regulariza los pagos";
      } else {
        errors.groupId = "";
      }
    } else {
      errors.groupId = "";
    }

    return errors;
  }
}
