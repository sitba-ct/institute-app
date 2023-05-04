import { container } from "tsyringe";
import { IGroupService } from "./IGroupService";
import { GroupService } from "./GroupService";
import { IGroupValidationService } from "./validations/IGroupValidationService";
import { GroupValidationService } from "./validations/GroupValidationService";

const configureGroupServices = () => {
    container.register(`${IGroupService}`, { useClass: GroupService });
    container.register(`${IGroupValidationService}`, { useClass: GroupValidationService });
}

export default configureGroupServices;