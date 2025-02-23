class HashMap {

    loadFactor = 0;
    capacity = 16;
    hashArray = []; 
    constructor(){
        this.initialiseBuckets(this.hashArray);
    }

    getCapacity() {
        return this.capacity;
    }

    initialiseBuckets(arr) {
        for ( let i = 0; i < this.capacity; i++ ) {
            arr[i] = null;
        }
    }

    hash( key ) {
        let hashCode = 0;

        const primeNumber = 31;
        for ( let i = 0; i < key.length; i++ ) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i) + 31;
        }

        return hashCode % this.capacity;
    }

    set( key, value ) {
        const getHash = this.hash( key );
        const newPair = { "key": key, "value": value };

        if ( this.hashArray[getHash] !== null ) {
            this.hashArray[getHash] = newPair;
        } else {
            this.hashArray[getHash] = newPair;
        }

        this.loadFactor++;
        this.calcLoadFactor();
    }

    get( key ) {
        const getHash = this.hash( key );
        if ( this.hashArray[getHash] !== null ) {
            return this.hashArray[getHash]["value"];
        } else {
            return null;
        }
    }

    has( key ) {
        const getHash = this.hash( key );
        if ( this.hashArray[getHash] !== null ) {
            return true;
        } else {
            return false;
        }
    }

    remove( key ) {
        const getHash = this.hash( key );
        if ( this.hashArray[getHash] !== null ) {
            this.hashArray.splice( getHash, 0, this.hashArray[getHash] );
            return true;
        } else {
            return false;
        }
    }

    length() {
        let length = 0;
        for ( let i = 0; i < this.capacity; i++ ) {
            if( this.hashArray[i] !== null ) {
                length += 1;
            }
        }

        return length;
    }

    clear() {
        for ( let i = 0; i < this.capacity; i++ ) {
            this.hashArray[i] = null;
        }
    }

    keys() {
        const keys = [];
        for ( let i = 0; i < this.capacity; i++ ) {
            if( this.hashArray[i] !== null ) {
                keys.push( this.hashArray[i]["key"] );
            }
        }

        return keys;
    }

    values() {
        const values = [];
        for ( let i = 0; i < this.capacity; i++ ) {
            if( this.hashArray[i] !== null ) {
                values.push(this.hashArray[i]["value"]);
            }
        }

        return values;
    }

    entries() {
        getEntry = [];
        for ( let i = 0; i < this.capacity; i++ ) {
            if( this.hashArray[i] !== null ) {
                getEntry.push( Object.entries( this.hashArray[i] ) );
            }
        }

        return getEntry;
    }

    calcLoadFactor() {
        if ( (this.loadFactor / this.capacity) > 0.75 ) {
            this.doubleCapacity();
        }
    }

    doubleCapacity() {
        const tempArr = [];
        this.capacity = this.capacity * 2;
        this.initialiseBuckets(tempArr);


        for( let i = 0; i < this.hashArray.length; i++ ) {
            if ( this.hashArray[i] !== null ) {
                console.log(this.hashArray[i]["key"]);
                let tempKey = this.hashArray[i]["key"];
                let hashCode = this.hash(tempKey);
                tempArr[hashCode] = this.hashArray[i];
                console.log(`Temp: ${tempArr[hashCode]["key"]}`);
            }
        }

        this.hashArray = tempArr;
    }
}

export { HashMap };