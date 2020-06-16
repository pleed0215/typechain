import * as CryptoJS from "crypto-js";

class Block {
  public index: number;
  public hash: string;
  public prevHash: string;
  public data: string;
  public timeStamp: number;

  static calcHash = (
    idx: number,
    prevHash: string,
    data: string,
    timeStamp: number
  ): string => CryptoJS.SHA256(idx + prevHash + data + timeStamp).toString();
  static checkValidate = (b: Block): boolean => {
    return (
      typeof b.index === "number" &&
      typeof b.hash === "string" &&
      typeof b.prevHash === "string" &&
      typeof b.data === "string" &&
      typeof b.timeStamp === "number"
    );
  };

  constructor(
    index: number,
    hash: string,
    prevHash: string,
    data: string,
    timeStamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.prevHash = prevHash;
    this.data = data;
    this.timeStamp = timeStamp;
  }
}

const genesisBlock = new Block(123134, "1202020", "", "Hello", 123456);

let blocks: Block[] = [genesisBlock];
const getBlockchain = (): Block[] => blocks;
const getLastestBlock = (): Block => blocks[blocks.length - 1];
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);
const calcBlockHash = (b: Block): string =>
  Block.calcHash(b.index, b.prevHash, b.data, b.timeStamp);
const createNewBlock = (data: string): Block => {
  const prevBlock: Block = getLastestBlock();
  const newIndex: number = prevBlock.index + 1;
  const timeStamp: number = getNewTimeStamp();
  const newHash: string = Block.calcHash(
    newIndex,
    prevBlock.hash,
    data,
    timeStamp
  );
  const newBlock = new Block(
    newIndex,
    newHash,
    prevBlock.hash,
    data,
    timeStamp
  );
  blocks.push(newBlock);
  return newBlock;
};
const isValidBlock = (candidate: Block, prevBlock: Block): boolean => {
  return (
    Block.checkValidate(candidate) &&
    candidate.index === prevBlock.index + 1 &&
    prevBlock.hash === candidate.prevHash &&
    calcBlockHash(candidate) === candidate.hash
  );
};

console.log(genesisBlock);
const hahaBlock: Block = createNewBlock("hahaha"),
  byebyeBlock: Block = createNewBlock("bye bye");
console.log(isValidBlock(byebyeBlock, hahaBlock));
