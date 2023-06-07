export const generateShortUUID = () => Math.random().toString(36).slice(-6);

interface MyObject {
  id: string;
  existing: boolean;
  [x: string]: any;
}
export function filterObjects<T extends MyObject>(arr: T[]): T[] {
  const uniqueObjects: { [key: string]: T } = {};

  for (const obj of arr) {
    const objId = obj.id;
    if (!(objId in uniqueObjects) || (obj.existing && !uniqueObjects[objId].existing)) {
      uniqueObjects[objId] = obj;
    }
  }

  return Object.values(uniqueObjects);
}

export function compareObjects(a: MyObject, b: MyObject): number {
  if (a.existing && !b.existing) return 1;
  else if (!a.existing && b.existing) return -1;
  else return 0;
}
