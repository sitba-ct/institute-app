import { container } from "tsyringe";
import { useState, useEffect, useContext } from "react";
import { GroupService } from "../../services/group/GroupService";
import IGroup from "../../services/group/IGroup";
import DeleteGroup from "./deleteGroup/DeleteGroup";
import EditGroup from "./editGroup/EditGroup";
import AddGroup from "./addGroup/AddGroup";
import IDiscount from "../../services/group/IDiscount";
import AddDiscount from "./addDiscount/AddDiscount";
import "./groups.scss";
import { useNavigate } from "react-router-dom";
import { GroupContext } from "../../context/GroupContextProvider";
import { useTranslation } from "react-i18next";

const Groups = () => {
  let navigate = useNavigate();

  const [groupsTranslation] = useTranslation("groups");

  const groupService = container.resolve(GroupService);

  const [groups, setGroups] = useState<IGroup[]>([]);
  const { group, setGroup } = useContext(GroupContext);
  const [discounts, setDiscounts] = useState<IDiscount[]>([]);

  const initGroups = async () => {
    let groups = await groupService.get();
    const sortedWords = [...groups].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    setGroups(sortedWords);
  };

  const initDiscounts = async () => {
    let groups = await groupService.getDiscount();
    let ascendingGroups = groups.sort(
      (a, b) => a.integrantsAmount - b.integrantsAmount
    );
    setDiscounts(ascendingGroups);
  };

  useEffect(() => {
    initGroups();
    initDiscounts();
  }, []);

  function onSuccessGroupAdd(groups: IGroup[]) {
    setGroups(groups);
  }
  function onSuccessDiscounAdd(discounts: IDiscount[]) {
    setDiscounts(discounts);
  }

  function onSuccessGroupDelete(deletedGroup: IGroup) {
    var filteredGroups = groups.filter((group) => group.id !== deletedGroup.id);
    setGroups(filteredGroups);
  }

  function onSuccessGroupEdit(editGroup: IGroup) {
    var filteredGroups = groups.map((group) => {
      if (group.id === editGroup.id) {
        return (group = editGroup);
      }
      return group;
    });
    setGroups(filteredGroups);
  }

  return (
    <div className=" d-flex flex-row containerGeneral">
      <table className=" table table-striped groupsTable ">
        <thead>
          <tr>
            <th className="fs-5 ">{groupsTranslation("groups.groups")}</th>
          </tr>
          <tr>
            <th className="text-start ">{groupsTranslation("groups.name")}</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => {
            return (
              <tr key={group.id} className="d-flex text-start">
                <td
                  className="w-100 text-primary cursor "
                  onClick={() => {
                    setGroup(group);
                    navigate(`students`);
                  }}
                >
                  <u>{group.name}</u>
                </td>

                <EditGroup
                  group={group}
                  onSuccessGroupEdit={onSuccessGroupEdit}
                  groups={groups}
                />
                <DeleteGroup
                  group={group}
                  onSuccessGroupDelete={onSuccessGroupDelete}
                />
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <AddGroup onSuccessGroupAdd={onSuccessGroupAdd} groups={groups} />
        </tfoot>
      </table>
      <table className="table table-striped discountTable">
        <thead>
          <tr className="border-bottom border-dark rounded">
            <th className=" fs-5">{groupsTranslation("discount.discount")}</th>
          </tr>
          <tr className="d-flex flex-row ">
            <th className="w-100 text-center">
              {groupsTranslation("discount.integrants")}
            </th>
            <th className="w-100 text-center ps-4">
              {groupsTranslation("discount.rate")}
            </th>
          </tr>
        </thead>
        <tbody>
          {discounts.map((discount) => {
            return (
              <tr key={discount.id} className=" d-flex ">
                <td className="w-50 p-1 ps-2 text-center">
                  {discount.integrantsAmount}
                </td>

                <td className="w-50  ps-4 text-center">
                  {discount.discountRate * 100}%
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <AddDiscount
            onSuccessDiscountAdd={onSuccessDiscounAdd}
            discount={discounts}
          />
        </tfoot>
      </table>
    </div>
  );
};

export default Groups;
