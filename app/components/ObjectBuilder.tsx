import { useRecoilState } from "recoil";
import { atom } from "recoil";

export function ObjectBuilder() {
  const [objectBuilderItem, setObjectBuilderItem] =
    useRecoilState(objectBuilderState);

  console.log(objectBuilderItem);

  return <ObjectItem {...objectBuilderItem} path="0" />;
}

// Sample data

/**
 * Renders an object item with its sub-objects.
 * @param {ObjectItemType} props - The props for the ObjectItem component.
 * @param {string} props.data - The data for the object item.
 * @param {ObjectItemType[]} props.subObjects - The sub-objects for the object item.
 * @param {string} props.path - The path of the object item.
 * @returns {JSX.Element} The rendered ObjectItem component.
 */
function ObjectItem({ data, subObjects, path, ...props }: ObjectItemType) {
  const [objectBuilderItem, setObjectBuilderItem] =
    useRecoilState(objectBuilderState);

  const insertObject = () => {
    let newData = JSON.parse(JSON.stringify(objectBuilderItem));
    const newCompleteObject = insertPathObject(path, newData, {
      data: "new",
      subObjects: [],
    });
    setObjectBuilderItem(newCompleteObject ?? newData);
  };
  return (
    <div {...props}>
      {"{"}
      <div>
        {data} {path}
      </div>
      <div>
        {subObjects.length > 0
          ? subObjects.map((item, index) => (
              <ObjectItem
                key={path + index}
                className="ml-8"
                path={path + "." + index}
                {...item}
              />
            ))
          : ""}
      </div>
      <button
        onClick={() => {
          insertObject();
        }}
        className="h-1 hover:h-1 hover:bg-neutral-400 w-full "
      ></button>
      {"}"}
    </div>
  );
}

/**
 * Gets the object at the specified path.
 * @param {string} path - The path to the object.
 *  @param {ObjectItemType} object - The object to get the path from.
 * @returns {ObjectItemType | undefined} The object at the specified path.
 * Returns undefined if the path is invalid.
 *
 */
export function getPathObject(path: string, object: ObjectItemType) {
  const pathArray = path.split(".");
  const firstPath = pathArray.shift();
  if (firstPath !== "0") {
    return undefined;
  }
  console.log(pathArray);
  let currentObject = object;

  for (const pathItem of pathArray) {
    if (currentObject.subObjects.length <= parseInt(pathItem)) {
      return undefined;
    }

    currentObject = currentObject.subObjects[parseInt(pathItem)];
  }

  return currentObject;
}

/**
 * Returns an object with the new object at the specified path. Creates the path if it doesn't exist and is valid.
 * @param {string} path - The path to the object.
 *  @param {ObjectItemType} object - The object to get the path from.
 * @param {ObjectItemType} newObject - The new object to insert at the path.
 * @returns {ObjectItemType | undefined} The object at the specified path.
 * Returns undefined if the path is invalid.
 *
 */
export function setPathObject(
  path: string,
  object: ObjectItemType,
  newObject: ObjectItemType
) {
  const pathArray = path.split(".");
  const firstPath = pathArray.shift();
  if (firstPath !== "0") {
    return undefined;
  }
  console.log(pathArray);
  let currentObject = object;

  for (const pathItem of pathArray) {
    if (currentObject.subObjects.length <= parseInt(pathItem)) {
      return undefined;
    }

    currentObject = currentObject.subObjects[parseInt(pathItem)];
  }

  currentObject.data = newObject.data;
  currentObject.subObjects = newObject.subObjects;

  return object;
}

/** Inserts an object behind the object at the specified path.
 * @param {string} path - The path to the object.
 * @param {ObjectItemType} object - The object to get the path from.
 * @param {ObjectItemType} newObject - The new object to insert at the path.
 * @returns {ObjectItemType | undefined} The object at the specified path.
 * Returns undefined if the path is invalid.
 */
export function insertPathObject(
  path: string,
  object: ObjectItemType,
  newObject: ObjectItemType,
  after = true
) {
  const pathArray = path.split(".");
  const firstPath = pathArray.shift();
  const lastPath = pathArray.pop();
  if (firstPath !== "0") {
    return undefined;
  }
  console.log(pathArray);
  let currentObject = object;

  for (const pathItem of pathArray) {
    if (currentObject.subObjects.length <= parseInt(pathItem)) {
      return undefined;
    }

    currentObject = currentObject.subObjects[parseInt(pathItem)];
  }

  const index = parseInt(lastPath ?? "0");
  after
    ? currentObject.subObjects.splice(index + 1, 0, newObject)
    : currentObject.subObjects.splice(index, 0, newObject);

  return object;
}

type ObjectItemType = {
  data: any;
  subObjects: ObjectItemType[];
  [props: string]: any;
};

const objectBuilderState = atom({
  key: "objectBuilder", // unique ID (with respect to other atoms/selectors)
  default: {
    data: <div className="text-[30px]">testing</div>,
    subObjects: [
      {
        data: "world",
        subObjects: [
          {
            data: "!",
            subObjects: [
              {
                data: "world",
                subObjects: [],
              },
              {
                data: "How",
                subObjects: [],
              },
              {
                data: "are",
                subObjects: [],
              },
              {
                data: "you",
                subObjects: [],
              },
              {
                data: "doing",
                subObjects: [],
              },
              {
                data: "today",
                subObjects: [],
              },
            ],
          },
        ],
      },
    ],
  }, // default value (aka initial value)
});
