import { validateOptions, forEach } from '../src/util';

describe("util",()=>{
  describe("forEach",()=>{
    test("should call the passed callback function with every key-value pair of the object",()=>{
      const mockCallBack = jest.fn();
      const object = { 'id':1, 'name':'dummy'};
      forEach(object,mockCallBack);
      expect(mockCallBack).toHaveBeenCalledTimes(2);
      expect(mockCallBack).toHaveBeenNthCalledWith(1, 1, 'id');
      expect(mockCallBack).toHaveBeenNthCalledWith(2, 'dummy', 'name');
    });
  
    test("should not call callback function if the given object is empty",()=>{
      const mockCallBack = jest.fn();
      const object = {};
      forEach(object,mockCallBack);
      expect(mockCallBack).toHaveBeenCalledTimes(0);
    });
  });
  describe("validateOptions",()=>{
    test("should return true if both the given pattern is a valid Regex and the given process is a function",()=>{
      const process = () => {};
      const pattern = new RegExp('ab+c');
      const isValid = validateOptions({pattern, process});
      expect(isValid).toEqual(true);
    });
    test("should return false if the given pattern is a valid Regex and the given process is not a function",()=>{
      const process = "dummy string";
      const pattern = new RegExp('ab+c');
      const isValid = validateOptions({pattern, process});
      expect(isValid).toEqual(false);
    });

    test("should return false if the given pattern is not a valid Regex but the given process is a function",()=>{
      const process = () => {};
      const pattern = "abcd";
      const isValid = validateOptions({pattern, process});
      expect(isValid).toEqual(false);
    });
  })
});