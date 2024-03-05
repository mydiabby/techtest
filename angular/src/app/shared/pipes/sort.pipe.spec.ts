import { SortPipe } from './sort.pipe';

describe('SortPipe', () => {
    const pipe = new SortPipe();

    it('should create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return empty lsit', () => {
        const list: any[] = [];
        const result = pipe.transform(list, 'property1');
        expect(result.length).toBe(0);
        expect(result).toEqual([]);
    });

    it('should sort with the number property', () => {
        const list: any[] = [
            { property1: 45, property2: 'aaaa' },
            { property1: 12, property2: 'bbbb' }
        ];
        const result = pipe.transform(list, 'property1');
        expect(result.length).toBe(2);
        expect(result[0]).toEqual({ property1: 12, property2: 'bbbb' });
        expect(result[1]).toEqual({ property1: 45, property2: 'aaaa' });
    });

    it('should sort with the string property', () => {
        const list: any[] = [
            { property1: 45, property2: 'aaaa' },
            { property1: 12, property2: 'bbbb' }
        ];
        const result = pipe.transform(list, 'property2');
        expect(result.length).toBe(2);
        expect(result[0]).toEqual({ property1: 45, property2: 'aaaa' });
        expect(result[1]).toEqual({ property1: 12, property2: 'bbbb' });
    });

    it('should sort in the reverse order', () => {
        const list: any[] = [
            { property1: 45, property2: 'fdbdvcsd' },
            { property1: 18, property2: 'zefc' },
            { property1: 150, property2: 'y' }
        ];
        const result = pipe.transform(list, 'property1', 'desc');
        expect(result.length).toBe(3);
        expect(result[0]).toEqual({ property1: 150, property2: 'y' });
        expect(result[1]).toEqual({ property1: 45, property2: 'fdbdvcsd' });
        expect(result[2]).toEqual({ property1: 18, property2: 'zefc' });
    });

});
