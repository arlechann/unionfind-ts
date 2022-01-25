export declare type UnionFind = {
    readonly size: number;
    parents: number[];
    ranks: number[];
    tree_sizes: number[];
};
export declare const UnionFind: {
    new(n: number): UnionFind;
    size(uf: UnionFind): number;
    unite(uf: UnionFind, a: number, b: number): boolean;
    are_united(uf: UnionFind, a: number, b: number): boolean;
    group_size(uf: UnionFind, n: number): number;
    groups(uf: UnionFind): number[][];
    root(uf: UnionFind, n: number): number;
};
//# sourceMappingURL=unionfind.d.ts.map