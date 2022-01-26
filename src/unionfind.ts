export type UnionFind = {
  readonly size: number;
  parents: number[];
  ranks: number[];
  tree_sizes: number[];
}

export const UnionFind = {
  create(n: number): UnionFind {
    return {
      size: n,
      parents: [...Array(n)].map((v, i) => i),
      ranks: [...Array(n)].map(() => 0),
      tree_sizes: [...Array(n)].map(() => 1),
    };
  },

  size(uf: UnionFind): number {
    return uf.size;
  },

  unite(uf: UnionFind, a: number, b: number): boolean {
    let aroot = UnionFind.root(uf, a);
    let broot = UnionFind.root(uf, b);
    if (aroot === broot) { return false; }
    if (uf.ranks[aroot] < uf.ranks[broot]) {
      [aroot, broot] = [broot, aroot];
    }
    if (uf.ranks[aroot] === uf.ranks[broot]) {
      uf.ranks[aroot]++;
    }
    uf.tree_sizes[aroot] += uf.tree_sizes[broot];
    uf.parents[broot] = aroot;
    return true;
  },

  areUnited(uf: UnionFind, a: number, b: number): boolean {
    return UnionFind.root(uf, a) === UnionFind.root(uf, b);
  },

  group_size(uf: UnionFind, n: number): number {
    return uf.tree_sizes[UnionFind.root(uf, n)];
  },

  groups(uf: UnionFind): number[][] {
    const groups = [...Array(uf.size)].map((): number[] => []);
    [...Array(uf.size)].forEach((_, i) => UnionFind.root(uf, i));
    uf.parents.forEach((p, i) => groups[p].push(i));
    return groups.filter(a => a.length !== 0);
  },

  root(uf: UnionFind, n: number): number {
    const p = uf.parents[n];
    if (p == n) {
      return n;
    }
    return uf.parents[n] = UnionFind.root(uf, p);
  }
};