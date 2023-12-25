import {
  getPathObject,
  setPathObject,
  insertPathObject,
} from "./ObjectBuilder";

describe("getPathObject", () => {
  it("should return undefined if path is invalid", () => {
    const object = {
      data: "hello",
      subObjects: [
        { data: "subObject1", subObjects: [] },
        { data: "subObject2", subObjects: [] },
      ],
    };

    expect(getPathObject("0.2", object)).toBeUndefined();
    expect(getPathObject("1.1", object)).toBeUndefined();
    expect(getPathObject("2", object)).toBeUndefined();
  });

  it("should return the correct object at the given path", () => {
    const object = {
      data: "test",
      subObjects: [
        { data: "subObject1", subObjects: [] },
        { data: "subObject2", subObjects: [] },
      ],
    };

    expect(getPathObject("0.0", object)).toEqual({
      data: "subObject1",
      subObjects: [],
    });
    expect(getPathObject("0.1", object)).toEqual({
      data: "subObject2",
      subObjects: [],
    });
  });

  it("should return undefined if path is out of bounds", () => {
    const object = {
      data: "test",
      subObjects: [
        { data: "subObject1", subObjects: [] },
        { data: "subObject2", subObjects: [] },
      ],
    };

    expect(getPathObject("0.2", object)).toBeUndefined();
    expect(getPathObject("0.3", object)).toBeUndefined();
    expect(getPathObject("0.4", object)).toBeUndefined();
  });

  it("should return undefined if path is not a number", () => {
    const object = {
      data: "test",
      subObjects: [
        { data: "subObject1", subObjects: [] },
        { data: "subObject2", subObjects: [] },
      ],
    };

    expect(getPathObject("0.a", object)).toBeUndefined();
    expect(getPathObject("0.b", object)).toBeUndefined();
    expect(getPathObject("0.c", object)).toBeUndefined();
  });
});

describe("setPathObject", () => {
  // Existing test cases...

  // New test case for setPathObject
  it("should set the data at the specified path", () => {
    const object = {
      data: "test",
      subObjects: [
        { data: "subObject1", subObjects: [] },
        { data: "subObject2", subObjects: [] },
      ],
    };

    const newObject = {
      data: "newData",
      subObjects: [
        { data: "newSubObject1", subObjects: [] },
        { data: "newSubObject2", subObjects: [] },
      ],
    };

    const updatedObject = setPathObject("0.1", object, newObject);

    expect(updatedObject).toEqual({
      data: "test",
      subObjects: [
        { data: "subObject1", subObjects: [] },
        {
          data: "newData",
          subObjects: [
            { data: "newSubObject1", subObjects: [] },
            { data: "newSubObject2", subObjects: [] },
          ],
        },
      ],
    });
  });

  // New test case for setPathObject
  it("should return undefined if path is invalid", () => {
    const object = {
      data: "test",
      subObjects: [
        { data: "subObject1", subObjects: [] },
        { data: "subObject2", subObjects: [] },
      ],
    };

    const newObject = {
      data: "newData",
      subObjects: [
        { data: "newSubObject1", subObjects: [] },
        { data: "newSubObject2", subObjects: [] },
      ],
    };

    const updatedObject = setPathObject("1.0", object, newObject);

    expect(updatedObject).toBeUndefined();
  });
});

describe("insertPathObject", () => {
  // New test case for insertPathObject
  it("should insert the new object at the specified path", () => {
    const object = {
      data: "test",
      subObjects: [
        { data: "subObject1", subObjects: [] },
        { data: "subObject2", subObjects: [] },
      ],
    };

    const newObject = {
      data: "newData",
      subObjects: [],
    };

    const updatedObject = insertPathObject("0.0", object, newObject);

    expect(updatedObject).toEqual({
      data: "test",
      subObjects: [
        { data: "subObject1", subObjects: [] },
        {
          data: "newData",
          subObjects: [],
        },
        { data: "subObject2", subObjects: [] },
      ],
    });
  });
  it("should insert the new object into the empty object", () => {
    const object = {
      data: "test",
      subObjects: [],
    };

    const newObject = {
      data: "newData",
      subObjects: [],
    };

    const updatedObject = insertPathObject("0.0", object, newObject);

    expect(updatedObject).toEqual({
      data: "test",
      subObjects: [
        {
          data: "newData",
          subObjects: [],
        },
      ],
    });
  });
  it("should insert the new object at the specified nested path", () => {
    const object = {
      data: "test",
      subObjects: [
        { data: "subObject1", subObjects: [] },
        {
          data: "subObject2",
          subObjects: [{ data: "subObject0.1", subObjects: [] }],
        },
      ],
    };

    const newObject = {
      data: "newData",
      subObjects: [],
    };

    const updatedObject = insertPathObject("0.1.0", object, newObject);

    expect(updatedObject).toEqual({
      data: "test",
      subObjects: [
        { data: "subObject1", subObjects: [] },

        {
          data: "subObject2",
          subObjects: [
            { data: "subObject0.1", subObjects: [] },
            {
              data: "newData",
              subObjects: [],
            },
          ],
        },
      ],
    });
  });
  it("should insert the new object at the specified nested path before", () => {
    const object = {
      data: "test",
      subObjects: [
        { data: "subObject1", subObjects: [] },
        {
          data: "subObject2",
          subObjects: [{ data: "subObject0.1", subObjects: [] }],
        },
      ],
    };

    const newObject = {
      data: "newData",
      subObjects: [],
    };

    const updatedObject = insertPathObject("0.1.0", object, newObject, false);

    expect(updatedObject).toEqual({
      data: "test",
      subObjects: [
        { data: "subObject1", subObjects: [] },

        {
          data: "subObject2",
          subObjects: [
            {
              data: "newData",
              subObjects: [],
            },
            { data: "subObject0.1", subObjects: [] },
          ],
        },
      ],
    });
  });
  it("should return undefined if path is invalid", () => {
    const object = {
      data: "test",
      subObjects: [
        { data: "subObject1", subObjects: [] },
        { data: "subObject2", subObjects: [] },
      ],
    };

    const newObject = {
      data: "newData",
      subObjects: [
        { data: "newSubObject1", subObjects: [] },
        { data: "newSubObject2", subObjects: [] },
      ],
    };

    const updatedObject = insertPathObject("1.0", object, newObject);

    expect(updatedObject).toBeUndefined();
  });
});
