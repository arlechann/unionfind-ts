export const UnionFind = {
    new(n) {
        return {
            size: n,
            parents: [...Array(n)].map((v, i) => i),
            ranks: [...Array(n)].map(() => 0),
            tree_sizes: [...Array(n)].map(() => 1),
        };
    },
    size(uf) {
        return uf.size;
    },
    unite(uf, a, b) {
        let aroot = UnionFind.root(uf, a);
        let broot = UnionFind.root(uf, b);
        if (aroot === broot) {
            return false;
        }
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
    are_united(uf, a, b) {
        return UnionFind.root(uf, a) === UnionFind.root(uf, b);
    },
    group_size(uf, n) {
        return uf.tree_sizes[UnionFind.root(uf, n)];
    },
    groups(uf) {
        const groups = [...Array(uf.size)].map(() => []);
        [...Array(uf.size)].forEach((_, i) => UnionFind.root(uf, i));
        uf.parents.forEach((p, i) => groups[p].push(i));
        return groups.filter(a => a.length !== 0);
    },
    root(uf, n) {
        const p = uf.parents[n];
        if (p == n) {
            return n;
        }
        return uf.parents[n] = UnionFind.root(uf, p);
    }
};
