import {
  faTrash,
  faSignOutAlt,
  faEdit,
  faMinusCircle,
  faCircleNotch,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icons = () => {
  return library.add(
    faTrash,
    faSignOutAlt,
    faEdit,
    faMinusCircle,
    faCircleNotch,
    faPlusCircle
  );
};

export default Icons;
