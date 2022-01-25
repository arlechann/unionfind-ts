import { describe, it } from 'mocha';
import { assert } from 'chai';
import { UnionFind } from '../src/unionfind'

describe('UnionFind', () => {
  context('new', () => {
    it('size が 0 の場合', () => {
      const uf = UnionFind.new(0);
      assert.deepStrictEqual(uf, {
        size: 0,
        parents: [],
        ranks: [],
        tree_sizes: [],
      });
    });

    it('size が 正整数の場合', () => {
      const uf = UnionFind.new(4);
      assert.deepStrictEqual(uf, {
        size: 4,
        parents: [0, 1, 2, 3],
        ranks: [0, 0, 0, 0],
        tree_sizes: [1, 1, 1, 1],
      });
    });
  })

  context('unite', () => {
    it('uf.ranks[a] === uf.ranks[b] の場合', () => {
      {
        const uf = {
          size: 4,
          parents: [0, 1, 2, 3],
          ranks: [0, 0, 0, 0],
          tree_sizes: [1, 1, 1, 1],
        };
        UnionFind.unite(uf, 0, 1);
        assert.deepStrictEqual(uf, {
          size: 4,
          parents: [0, 0, 2, 3],
          ranks: [1, 0, 0, 0],
          tree_sizes: [2, 1, 1, 1],
        });
      }
      {
        const uf = {
          size: 8,
          parents: [0, 0, 0, 2, 4, 4, 4, 6],
          ranks: [2, 0, 1, 0, 2, 0, 1, 0],
          tree_sizes: [4, 1, 2, 1, 4, 1, 2, 1],
        };
        UnionFind.unite(uf, 0, 4);
        assert.deepStrictEqual(uf, {
          size: 8,
          parents: [0, 0, 0, 2, 0, 4, 4, 6],
          ranks: [3, 0, 1, 0, 2, 0, 1, 0],
          tree_sizes: [8, 1, 2, 1, 4, 1, 2, 1],
        });
      }
    });

    it('uf.ranks[a] > uf.ranks[b] の場合', () => {
      {
        const uf = {
          size: 4,
          parents: [0, 0, 2, 3],
          ranks: [1, 0, 0, 0],
          tree_sizes: [2, 1, 1, 1],
        };
        UnionFind.unite(uf, 0, 2);
        assert.deepStrictEqual(uf, {
          size: 4,
          parents: [0, 0, 0, 3],
          ranks: [1, 0, 0, 0],
          tree_sizes: [3, 1, 1, 1],
        });
      }
      {
        const uf = {
          size: 8,
          parents: [0, 0, 0, 2, 4, 4, 6, 7],
          ranks: [2, 0, 1, 0, 1, 0, 0, 0],
          tree_sizes: [4, 1, 2, 1, 2, 1, 1, 1],
        };
        UnionFind.unite(uf, 3, 5);
        assert.deepStrictEqual(uf, {
          size: 8,
          parents: [0, 0, 0, 0, 0, 4, 6, 7],
          ranks: [2, 0, 1, 0, 1, 0, 0, 0],
          tree_sizes: [6, 1, 2, 1, 2, 1, 1, 1],
        });
      }
    });

    it('uf.ranks[a] < uf.ranks[b] の場合', () => {
      {
        const uf = {
          size: 4,
          parents: [0, 1, 2, 2],
          ranks: [0, 0, 1, 0],
          tree_sizes: [1, 1, 2, 1],
        };
        UnionFind.unite(uf, 0, 2);
        assert.deepStrictEqual(uf, {
          size: 4,
          parents: [2, 1, 2, 2],
          ranks: [0, 0, 1, 0],
          tree_sizes: [1, 1, 3, 1],
        });
      }
      {
        const uf = {
          size: 8,
          parents: [0, 1, 2, 2, 4, 4, 4, 6],
          ranks: [0, 0, 1, 0, 2, 0, 1, 0],
          tree_sizes: [1, 1, 2, 1, 4, 1, 2, 1],
        };
        UnionFind.unite(uf, 3, 7);
        assert.deepStrictEqual(uf, {
          size: 8,
          parents: [0, 1, 4, 2, 4, 4, 4, 4],
          ranks: [0, 0, 1, 0, 2, 0, 1, 0],
          tree_sizes: [1, 1, 2, 1, 6, 1, 2, 1],
        });
      }
    });
  });

  context('groups', () => {
    it('空グラフの場合', () => {
      const uf = {
        size: 8,
        parents: [0, 1, 2, 3, 4, 5, 6, 7],
        ranks: [0, 0, 0, 0, 0, 0, 0, 0],
        tree_sizes: [1, 1, 1, 1, 1, 1, 1, 1],
      };
      assert.deepStrictEqual(UnionFind.groups(uf), [[0], [1], [2], [3], [4], [5], [6], [7]]);
    });

    it('連結グラフの場合', () => {
      const uf = {
        size: 8,
        parents: [0, 0, 0, 2, 0, 4, 4, 6],
        ranks: [3, 0, 1, 0, 2, 0, 1, 0],
        tree_sizes: [8, 1, 2, 1, 4, 1, 2, 1],
      };
      assert.deepStrictEqual(UnionFind.groups(uf), [[0, 1, 2, 3, 4, 5, 6, 7]]);
    });

    it('非連結グラフの場合', () => {
      const uf = {
        size: 8,
        parents: [0, 0, 0, 2, 4, 4, 6, 7],
        ranks: [2, 0, 1, 0, 1, 0, 0, 0],
        tree_sizes: [4, 1, 2, 1, 2, 1, 1, 1],
      };
      assert.deepStrictEqual(UnionFind.groups(uf), [[0, 1, 2, 3], [4, 5], [6], [7]]);
    });
  });
});