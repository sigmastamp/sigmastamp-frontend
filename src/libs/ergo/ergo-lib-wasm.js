let imports = {};
imports['__wbindgen_placeholder__'] = module.exports;
let wasm;
// const { TextEncoder, TextDecoder } = require(`util`);

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) {
    return heap[idx];
}

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let WASM_VECTOR_LEN = 0;

let cachedUint8Memory0 = new Uint8Array();

function getUint8Memory0() {
    if (cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

let cachedTextEncoder = new TextEncoder('utf-8');

const encodeString =
    typeof cachedTextEncoder.encodeInto === 'function'
        ? function (arg, view) {
              return cachedTextEncoder.encodeInto(arg, view);
          }
        : function (arg, view) {
              const buf = cachedTextEncoder.encode(arg);
              view.set(buf);
              return {
                  read: arg.length,
                  written: buf.length,
              };
          };

function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0()
            .subarray(ptr, ptr + buf.length)
            .set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7f) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, (len = offset + arg.length * 3));
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedInt32Memory0 = new Int32Array();

function getInt32Memory0() {
    if (cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

let cachedTextDecoder = new TextDecoder('utf-8', {
    ignoreBOM: true,
    fatal: true,
});

cachedTextDecoder.decode();

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let cachedFloat64Memory0 = new Float64Array();

function getFloat64Memory0() {
    if (cachedFloat64Memory0.byteLength === 0) {
        cachedFloat64Memory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachedFloat64Memory0;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for (let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

let cachedUint32Memory0 = new Uint32Array();

function getUint32Memory0() {
    if (cachedUint32Memory0.byteLength === 0) {
        cachedUint32Memory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32Memory0;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4);
    const mem = getUint32Memory0();
    for (let i = 0; i < array.length; i++) {
        mem[ptr / 4 + i] = addHeapObject(array[i]);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

function getArrayU8FromWasm0(ptr, len) {
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1);
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
/**
 * Encode a JS array as an Ergo tuple.
 * @param {any[]} items
 * @returns {any}
 */
module.exports.array_as_tuple = function (items) {
    const ptr0 = passArrayJsValueToWasm0(items, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.array_as_tuple(ptr0, len0);
    return takeObject(ret);
};

/**
 * Extracting hints form singed(invalid) Transaction
 * @param {Transaction} signed_transaction
 * @param {ErgoStateContext} state_context
 * @param {ErgoBoxes} boxes_to_spend
 * @param {ErgoBoxes} data_boxes
 * @param {Propositions} real_propositions
 * @param {Propositions} simulated_propositions
 * @returns {TransactionHintsBag}
 */
module.exports.extract_hints = function (
    signed_transaction,
    state_context,
    boxes_to_spend,
    data_boxes,
    real_propositions,
    simulated_propositions,
) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        _assertClass(signed_transaction, Transaction);
        var ptr0 = signed_transaction.ptr;
        signed_transaction.ptr = 0;
        _assertClass(state_context, ErgoStateContext);
        _assertClass(boxes_to_spend, ErgoBoxes);
        _assertClass(data_boxes, ErgoBoxes);
        _assertClass(real_propositions, Propositions);
        var ptr1 = real_propositions.ptr;
        real_propositions.ptr = 0;
        _assertClass(simulated_propositions, Propositions);
        var ptr2 = simulated_propositions.ptr;
        simulated_propositions.ptr = 0;
        wasm.extract_hints(
            retptr,
            ptr0,
            state_context.ptr,
            boxes_to_spend.ptr,
            data_boxes.ptr,
            ptr1,
            ptr2,
        );
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        if (r2) {
            throw takeObject(r1);
        }
        return TransactionHintsBag.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
};

function getArrayJsValueFromWasm0(ptr, len) {
    const mem = getUint32Memory0();
    const slice = mem.subarray(ptr / 4, ptr / 4 + len);
    const result = [];
    for (let i = 0; i < slice.length; i++) {
        result.push(takeObject(slice[i]));
    }
    return result;
}
/**
 * Decodes a base16 string into an array of bytes
 * @param {string} data
 * @returns {Uint8Array}
 */
module.exports.base16_decode = function (data) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(
            data,
            wasm.__wbindgen_malloc,
            wasm.__wbindgen_realloc,
        );
        const len0 = WASM_VECTOR_LEN;
        wasm.base16_decode(retptr, ptr0, len0);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        var r3 = getInt32Memory0()[retptr / 4 + 3];
        if (r3) {
            throw takeObject(r2);
        }
        var v1 = getArrayU8FromWasm0(r0, r1).slice();
        wasm.__wbindgen_free(r0, r1 * 1);
        return v1;
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
};

let stack_pointer = 32;

function addBorrowedObject(obj) {
    if (stack_pointer == 1) throw new Error('out of js stack');
    heap[--stack_pointer] = obj;
    return stack_pointer;
}

function passArray32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4);
    getUint32Memory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function getArrayI32FromWasm0(ptr, len) {
    return getInt32Memory0().subarray(ptr / 4, ptr / 4 + len);
}
/**
 * Verify that the signature is presented to satisfy SigmaProp conditions.
 * @param {Address} address
 * @param {Uint8Array} message
 * @param {Uint8Array} signature
 * @returns {boolean}
 */
module.exports.verify_signature = function (address, message, signature) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        _assertClass(address, Address);
        const ptr0 = passArray8ToWasm0(message, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(signature, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        wasm.verify_signature(retptr, address.ptr, ptr0, len0, ptr1, len1);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        if (r2) {
            throw takeObject(r1);
        }
        return r0 !== 0;
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
};

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}
/**
 * newtype for box registers R4 - R9
 */
module.exports.NonMandatoryRegisterId = Object.freeze({
    /**
     * id for R4 register
     */
    R4: 4,
    4: 'R4',
    /**
     * id for R5 register
     */
    R5: 5,
    5: 'R5',
    /**
     * id for R6 register
     */
    R6: 6,
    6: 'R6',
    /**
     * id for R7 register
     */
    R7: 7,
    7: 'R7',
    /**
     * id for R8 register
     */
    R8: 8,
    8: 'R8',
    /**
     * id for R9 register
     */
    R9: 9,
    9: 'R9',
});
/**
 * Network type
 */
module.exports.NetworkPrefix = Object.freeze({
    /**
     * Mainnet
     */
    Mainnet: 0,
    0: 'Mainnet',
    /**
     * Testnet
     */
    Testnet: 16,
    16: 'Testnet',
});
/**
 * Address types
 */
module.exports.AddressTypePrefix = Object.freeze({
    /**
     * 0x01 - Pay-to-PublicKey(P2PK) address
     */
    P2Pk: 1,
    1: 'P2Pk',
    /**
     * 0x02 - Pay-to-Script-Hash(P2SH)
     */
    Pay2Sh: 2,
    2: 'Pay2Sh',
    /**
     * 0x03 - Pay-to-Script(P2S)
     */
    Pay2S: 3,
    3: 'Pay2S',
});
/**
 *
 * * An address is a short string corresponding to some script used to protect a box. Unlike (string-encoded) binary
 * * representation of a script, an address has some useful characteristics:
 * *
 * * - Integrity of an address could be checked., as it is incorporating a checksum.
 * * - A prefix of address is showing network and an address type.
 * * - An address is using an encoding (namely, Base58) which is avoiding similarly l0Oking characters, friendly to
 * * double-clicking and line-breaking in emails.
 * *
 * *
 * *
 * * An address is encoding network type, address type, checksum, and enough information to watch for a particular scripts.
 * *
 * * Possible network types are:
 * * Mainnet - 0x00
 * * Testnet - 0x10
 * *
 * * For an address type, we form content bytes as follows:
 * *
 * * P2PK - serialized (compressed) public key
 * * P2SH - first 192 bits of the Blake2b256 hash of serialized script bytes
 * * P2S  - serialized script
 * *
 * * Address examples for testnet:
 * *
 * * 3   - P2PK (3WvsT2Gm4EpsM9Pg18PdY6XyhNNMqXDsvJTbbf6ihLvAmSb7u5RN)
 * * ?   - P2SH (rbcrmKEYduUvADj9Ts3dSVSG27h54pgrq5fPuwB)
 * * ?   - P2S (Ms7smJwLGbUAjuWQ)
 * *
 * * for mainnet:
 * *
 * * 9  - P2PK (9fRAWhdxEsTcdb8PhGNrZfwqa65zfkuYHAMmkQLcic1gdLSV5vA)
 * * ?  - P2SH (8UApt8czfFVuTgQmMwtsRBZ4nfWquNiSwCWUjMg)
 * * ?  - P2S (4MQyML64GnzMxZgm, BxKBaHkvrTvLZrDcZjcsxsF7aSsrN73ijeFZXtbj4CXZHHcvBtqSxQ)
 * *
 * *
 * * Prefix byte = network type + address type
 * *
 * * checksum = blake2b256(prefix byte ++ content bytes)
 * *
 * * address = prefix byte ++ content bytes ++ checksum
 * *
 *
 */
class Address {
    static __wrap(ptr) {
        const obj = Object.create(Address.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_address_free(ptr);
    }
    /**
     * Re-create the address from ErgoTree that was built from the address
     *
     * At some point in the past a user entered an address from which the ErgoTree was built.
     * Re-create the address from this ErgoTree.
     * `tree` - ErgoTree that was created from an Address
     * @param {ErgoTree} ergo_tree
     * @returns {Address}
     */
    static recreate_from_ergo_tree(ergo_tree) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(ergo_tree, ErgoTree);
            wasm.address_recreate_from_ergo_tree(retptr, ergo_tree.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Address.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Create a P2PK address from serialized PK bytes(EcPoint/GroupElement)
     * @param {Uint8Array} bytes
     * @returns {Address}
     */
    static p2pk_from_pk_bytes(bytes) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.address_p2pk_from_pk_bytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Address.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Decode (base58) testnet address from string, checking that address is from the testnet
     * @param {string} s
     * @returns {Address}
     */
    static from_testnet_str(s) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(
                s,
                wasm.__wbindgen_malloc,
                wasm.__wbindgen_realloc,
            );
            const len0 = WASM_VECTOR_LEN;
            wasm.address_from_testnet_str(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Address.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Decode (base58) mainnet address from string, checking that address is from the mainnet
     * @param {string} s
     * @returns {Address}
     */
    static from_mainnet_str(s) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(
                s,
                wasm.__wbindgen_malloc,
                wasm.__wbindgen_realloc,
            );
            const len0 = WASM_VECTOR_LEN;
            wasm.address_from_mainnet_str(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Address.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Decode (base58) address from string without checking the network prefix
     * @param {string} s
     * @returns {Address}
     */
    static from_base58(s) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(
                s,
                wasm.__wbindgen_malloc,
                wasm.__wbindgen_realloc,
            );
            const len0 = WASM_VECTOR_LEN;
            wasm.address_from_base58(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Address.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Encode (base58) address
     * @param {number} network_prefix
     * @returns {string}
     */
    to_base58(network_prefix) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.address_to_base58(retptr, this.ptr, network_prefix);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
     * Decode from a serialized address (that includes the network prefix)
     * @param {Uint8Array} data
     * @returns {Address}
     */
    static from_bytes(data) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.address_from_bytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Address.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Encode address as serialized bytes (that includes the network prefix)
     * @param {number} network_prefix
     * @returns {Uint8Array}
     */
    to_bytes(network_prefix) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.address_to_bytes(retptr, this.ptr, network_prefix);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Returns underlying value for each address type
     * (serialized EcPoint for P2PK, stored bytes for P2SH and P2S)
     * @returns {Uint8Array}
     */
    content_bytes() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.address_content_bytes(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Get the type of the address
     * @returns {number}
     */
    address_type_prefix() {
        const ret = wasm.address_address_type_prefix(this.ptr);
        return ret >>> 0;
    }
    /**
     * Create an address from a public key
     * @param {Uint8Array} bytes
     * @returns {Address}
     */
    static from_public_key(bytes) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.address_from_public_key(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Address.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Creates an ErgoTree script from the address
     * @returns {ErgoTree}
     */
    to_ergo_tree() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.address_to_ergo_tree(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ErgoTree.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.Address = Address;
/**
 * BatchMerkleProof type to validate root hash for multiple nodes
 */
class BatchMerkleProof {
    static __wrap(ptr) {
        const obj = Object.create(BatchMerkleProof.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_batchmerkleproof_free(ptr);
    }
    /**
     * Creates a new [`BatchMerkleProof`] from json representation
     * @param {any} json
     * @returns {BatchMerkleProof}
     */
    static from_json(json) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.batchmerkleproof_from_json(retptr, addBorrowedObject(json));
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return BatchMerkleProof.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * Converts [`BatchMerkleProof`] to json representation
     * @returns {any}
     */
    to_json() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.batchmerkleproof_to_json(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return takeObject(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Calculates root hash for [`BatchMerkleProof`] and compares it against expected root hash
     * @param {Uint8Array} expected_root
     * @returns {boolean}
     */
    valid(expected_root) {
        const ptr0 = passArray8ToWasm0(expected_root, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.batchmerkleproof_valid(this.ptr, ptr0, len0);
        return ret !== 0;
    }
}
module.exports.BatchMerkleProof = BatchMerkleProof;
/**
 * Block header
 */
class BlockHeader {
    static __wrap(ptr) {
        const obj = Object.create(BlockHeader.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_blockheader_free(ptr);
    }
    /**
     * Parse from JSON (Node API)
     * @param {string} json
     * @returns {BlockHeader}
     */
    static from_json(json) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(
                json,
                wasm.__wbindgen_malloc,
                wasm.__wbindgen_realloc,
            );
            const len0 = WASM_VECTOR_LEN;
            wasm.blockheader_from_json(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return BlockHeader.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Get Header's id
     * @returns {BlockId}
     */
    id() {
        const ret = wasm.blockheader_id(this.ptr);
        return BlockId.__wrap(ret);
    }
    /**
     * Get transactions root
     * @returns {Uint8Array}
     */
    transactions_root() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.blockheader_transactions_root(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.BlockHeader = BlockHeader;
/**
 * Collection of BlockHeaders
 */
class BlockHeaders {
    static __wrap(ptr) {
        const obj = Object.create(BlockHeaders.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_blockheaders_free(ptr);
    }
    /**
     * parse BlockHeader array from JSON (Node API)
     * @param {any[]} json_vals
     * @returns {BlockHeaders}
     */
    static from_json(json_vals) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArrayJsValueToWasm0(
                json_vals,
                wasm.__wbindgen_malloc,
            );
            const len0 = WASM_VECTOR_LEN;
            wasm.blockheaders_from_json(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return BlockHeaders.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Create new collection with one element
     * @param {BlockHeader} b
     */
    constructor(b) {
        _assertClass(b, BlockHeader);
        const ret = wasm.blockheaders_new(b.ptr);
        return BlockHeaders.__wrap(ret);
    }
    /**
     * Returns the number of elements in the collection
     * @returns {number}
     */
    len() {
        const ret = wasm.blockheaders_len(this.ptr);
        return ret >>> 0;
    }
    /**
     * Add an element to the collection
     * @param {BlockHeader} b
     */
    add(b) {
        _assertClass(b, BlockHeader);
        wasm.blockheaders_add(this.ptr, b.ptr);
    }
    /**
     * Returns the element of the collection with a given index
     * @param {number} index
     * @returns {BlockHeader}
     */
    get(index) {
        const ret = wasm.blockheaders_get(this.ptr, index);
        return BlockHeader.__wrap(ret);
    }
}
module.exports.BlockHeaders = BlockHeaders;
/**
 * Block id
 */
class BlockId {
    static __wrap(ptr) {
        const obj = Object.create(BlockId.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_blockid_free(ptr);
    }
    /**
     * Parse from base 16 encoded string
     * @param {string} id
     * @returns {BlockId}
     */
    static from_str(id) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(
                id,
                wasm.__wbindgen_malloc,
                wasm.__wbindgen_realloc,
            );
            const len0 = WASM_VECTOR_LEN;
            wasm.blockid_from_str(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return BlockId.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Equality check
     * @param {BlockId} id
     * @returns {boolean}
     */
    equals(id) {
        _assertClass(id, BlockId);
        const ret = wasm.blockid_equals(this.ptr, id.ptr);
        return ret !== 0;
    }
}
module.exports.BlockId = BlockId;
/**
 * Box id (32-byte digest)
 */
class BoxId {
    static __wrap(ptr) {
        const obj = Object.create(BoxId.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_boxid_free(ptr);
    }
    /**
     * Parse box id (32 byte digest) from base16-encoded string
     * @param {string} box_id_str
     * @returns {BoxId}
     */
    static from_str(box_id_str) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(
                box_id_str,
                wasm.__wbindgen_malloc,
                wasm.__wbindgen_realloc,
            );
            const len0 = WASM_VECTOR_LEN;
            wasm.boxid_from_str(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return BoxId.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Base16 encoded string
     * @returns {string}
     */
    to_str() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.boxid_to_str(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
     * Returns byte array (32 bytes)
     * @returns {Uint8Array}
     */
    as_bytes() {
        const ret = wasm.boxid_as_bytes(this.ptr);
        return takeObject(ret);
    }
}
module.exports.BoxId = BoxId;
/**
 * Selected boxes with change boxes (by [`BoxSelector`])
 */
class BoxSelection {
    static __wrap(ptr) {
        const obj = Object.create(BoxSelection.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_boxselection_free(ptr);
    }
    /**
     * Create a selection to easily inject custom selection algorithms
     * @param {ErgoBoxes} boxes
     * @param {ErgoBoxAssetsDataList} change
     */
    constructor(boxes, change) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(boxes, ErgoBoxes);
            _assertClass(change, ErgoBoxAssetsDataList);
            wasm.boxselection_new(retptr, boxes.ptr, change.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return BoxSelection.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Selected boxes to spend as transaction inputs
     * @returns {ErgoBoxes}
     */
    boxes() {
        const ret = wasm.boxselection_boxes(this.ptr);
        return ErgoBoxes.__wrap(ret);
    }
    /**
     * Selected boxes to use as change
     * @returns {ErgoBoxAssetsDataList}
     */
    change() {
        const ret = wasm.boxselection_change(this.ptr);
        return ErgoBoxAssetsDataList.__wrap(ret);
    }
}
module.exports.BoxSelection = BoxSelection;
/**
 * Box value in nanoERGs with bound checks
 */
class BoxValue {
    static __wrap(ptr) {
        const obj = Object.create(BoxValue.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_boxvalue_free(ptr);
    }
    /**
     * Recommended (safe) minimal box value to use in case box size estimation is unavailable.
     * Allows box size upto 2777 bytes with current min box value per byte of 360 nanoERGs
     * @returns {BoxValue}
     */
    static SAFE_USER_MIN() {
        const ret = wasm.boxvalue_SAFE_USER_MIN();
        return BoxValue.__wrap(ret);
    }
    /**
     * Number of units inside one ERGO (i.e. one ERG using nano ERG representation)
     * @returns {I64}
     */
    static UNITS_PER_ERGO() {
        const ret = wasm.boxvalue_UNITS_PER_ERGO();
        return I64.__wrap(ret);
    }
    /**
     * Create from i64 with bounds check
     * @param {I64} v
     * @returns {BoxValue}
     */
    static from_i64(v) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(v, I64);
            wasm.boxvalue_from_i64(retptr, v.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return BoxValue.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Get value as signed 64-bit long (I64)
     * @returns {I64}
     */
    as_i64() {
        const ret = wasm.boxvalue_as_i64(this.ptr);
        return I64.__wrap(ret);
    }
    /**
     * big-endian byte array representation
     * @returns {Uint8Array}
     */
    to_bytes() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.boxvalue_to_bytes(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.BoxValue = BoxValue;
/**
 * CommitmentHint
 */
class CommitmentHint {
    static __wrap(ptr) {
        const obj = Object.create(CommitmentHint.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_commitmenthint_free(ptr);
    }
}
module.exports.CommitmentHint = CommitmentHint;
/**
 * Ergo constant(evaluated) values
 */
class Constant {
    static __wrap(ptr) {
        const obj = Object.create(Constant.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_constant_free(ptr);
    }
    /**
     * Returns the debug representation of the type of the constant
     * @returns {string}
     */
    dbg_tpe() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.constant_dbg_tpe(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
     * Returns the debug representation of the value of the constant
     * @returns {string}
     */
    dbg_inner() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.constant_dbg_inner(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
     * Decode from Base16-encoded ErgoTree serialized value
     * @param {string} base16_bytes_str
     * @returns {Constant}
     */
    static decode_from_base16(base16_bytes_str) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(
                base16_bytes_str,
                wasm.__wbindgen_malloc,
                wasm.__wbindgen_realloc,
            );
            const len0 = WASM_VECTOR_LEN;
            wasm.constant_decode_from_base16(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Constant.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Encode as Base16-encoded ErgoTree serialized value or return an error if serialization
     * failed
     * @returns {string}
     */
    encode_to_base16() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.constant_encode_to_base16(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            var ptr0 = r0;
            var len0 = r1;
            if (r3) {
                ptr0 = 0;
                len0 = 0;
                throw takeObject(r2);
            }
            return getStringFromWasm0(ptr0, len0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(ptr0, len0);
        }
    }
    /**
     * Returns serialized bytes or fails with error if Constant cannot be serialized
     * @returns {Uint8Array}
     */
    sigma_serialize_bytes() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.constant_sigma_serialize_bytes(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Create from i32 value
     * @param {number} v
     * @returns {Constant}
     */
    static from_i32(v) {
        const ret = wasm.constant_from_i32(v);
        return Constant.__wrap(ret);
    }
    /**
     * Extract i32 value, returning error if wrong type
     * @returns {number}
     */
    to_i32() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.constant_to_i32(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return r0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Create from i64
     * @param {I64} v
     * @returns {Constant}
     */
    static from_i64(v) {
        _assertClass(v, I64);
        const ret = wasm.constant_from_i64(v.ptr);
        return Constant.__wrap(ret);
    }
    /**
     * Extract i64 value, returning error if wrong type
     * @returns {I64}
     */
    to_i64() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.constant_to_i64(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return I64.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Create BigInt constant from byte array (signed bytes bit-endian)
     * @param {Uint8Array} num
     * @returns {Constant}
     */
    static from_bigint_signed_bytes_be(num) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(num, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.constant_from_bigint_signed_bytes_be(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Constant.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Create from byte array
     * @param {Uint8Array} v
     * @returns {Constant}
     */
    static from_byte_array(v) {
        const ptr0 = passArray8ToWasm0(v, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.constant_from_byte_array(ptr0, len0);
        return Constant.__wrap(ret);
    }
    /**
     * Extract byte array, returning error if wrong type
     * @returns {Uint8Array}
     */
    to_byte_array() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.constant_to_byte_array(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return takeObject(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Create `Coll[Int]` from integer array
     * @param {Int32Array} arr
     * @returns {Constant}
     */
    static from_i32_array(arr) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray32ToWasm0(arr, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.constant_from_i32_array(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Constant.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Extract `Coll[Int]` as integer array
     * @returns {Int32Array}
     */
    to_i32_array() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.constant_to_i32_array(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v0 = getArrayI32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Create `Coll[Long]` from string array
     * @param {any[]} arr
     * @returns {Constant}
     */
    static from_i64_str_array(arr) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArrayJsValueToWasm0(arr, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.constant_from_i64_str_array(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Constant.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Extract `Coll[Long]` as string array
     * @returns {any[]}
     */
    to_i64_str_array() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.constant_to_i64_str_array(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v0 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Extract `Coll[Coll[Byte]]` as array of byte arrays
     * @returns {(Uint8Array)[]}
     */
    to_coll_coll_byte() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.constant_to_coll_coll_byte(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v0 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Create `Coll[Coll[Byte]]` from array byte array
     * @param {(Uint8Array)[]} arr
     * @returns {Constant}
     */
    static from_coll_coll_byte(arr) {
        const ptr0 = passArrayJsValueToWasm0(arr, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.constant_from_coll_coll_byte(ptr0, len0);
        return Constant.__wrap(ret);
    }
    /**
     * Parse raw `EcPoint` value from bytes and make `ProveDlog` constant
     * @param {Uint8Array} bytes
     * @returns {Constant}
     */
    static from_ecpoint_bytes(bytes) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.constant_from_ecpoint_bytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Constant.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Parse raw `EcPoint` value from bytes and make `GroupElement` constant
     * @param {Uint8Array} bytes
     * @returns {Constant}
     */
    static from_ecpoint_bytes_group_element(bytes) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.constant_from_ecpoint_bytes_group_element(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Constant.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Create `(Coll[Byte], Coll[Byte])` tuple Constant
     * @param {Uint8Array} bytes1
     * @param {Uint8Array} bytes2
     * @returns {Constant}
     */
    static from_tuple_coll_bytes(bytes1, bytes2) {
        const ptr0 = passArray8ToWasm0(bytes1, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(bytes2, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.constant_from_tuple_coll_bytes(ptr0, len0, ptr1, len1);
        return Constant.__wrap(ret);
    }
    /**
     * Extract `(Coll[Byte], Coll[Byte])` tuple from Constant as array of Uint8Array
     * @returns {(Uint8Array)[]}
     */
    to_tuple_coll_bytes() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.constant_to_tuple_coll_bytes(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v0 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Create `(Int, Int)` tuple Constant
     * @returns {any[]}
     */
    to_tuple_i32() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.constant_to_tuple_i32(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v0 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Create `(Long, Long)` tuple Constant
     * @param {I64} l1
     * @param {I64} l2
     * @returns {Constant}
     */
    static from_tuple_i64(l1, l2) {
        _assertClass(l1, I64);
        _assertClass(l2, I64);
        const ret = wasm.constant_from_tuple_i64(l1.ptr, l2.ptr);
        return Constant.__wrap(ret);
    }
    /**
     * Extract `(Long, Long)` tuple from Constant as array of strings
     * @returns {any[]}
     */
    to_tuple_i64() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.constant_to_tuple_i64(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v0 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Create from ErgoBox value
     * @param {ErgoBox} v
     * @returns {Constant}
     */
    static from_ergo_box(v) {
        _assertClass(v, ErgoBox);
        const ret = wasm.constant_from_ergo_box(v.ptr);
        return Constant.__wrap(ret);
    }
    /**
     * Extract ErgoBox value, returning error if wrong type
     * @returns {ErgoBox}
     */
    to_ergo_box() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.constant_to_ergo_box(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ErgoBox.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Create Constant with Unit value
     * @returns {Constant}
     */
    static unit() {
        const ret = wasm.constant_unit();
        return Constant.__wrap(ret);
    }
    /**
     * Returns true if constant value is Unit
     * @returns {boolean}
     */
    is_unit() {
        const ret = wasm.constant_is_unit(this.ptr);
        return ret !== 0;
    }
    /**
     * Create a Constant from JS value
     * JS types are converted to the following Ergo types:
     * Number -> Int,
     * String -> Long,
     * BigInt -> BigInt,
     * use array_as_tuple() to encode Ergo tuples
     * @param {any} value
     * @returns {Constant}
     */
    static from_js(value) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.constant_from_js(retptr, addBorrowedObject(value));
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Constant.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * Extract JS value from Constant
     * Ergo types are converted to the following JS types:
     * Byte -> Number,
     * Short -> Number,
     * Int -> Number,
     * Long -> String,
     * BigInt -> BigInt,
     * Ergo tuples are encoded as arrays
     * @returns {any}
     */
    to_js() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.constant_to_js(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return takeObject(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.Constant = Constant;
/**
 * User-defined variables to be put into context
 */
class ContextExtension {
    static __wrap(ptr) {
        const obj = Object.create(ContextExtension.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_contextextension_free(ptr);
    }
    /**
     * Create new ContextExtension instance
     */
    constructor() {
        const ret = wasm.contextextension_new();
        return ContextExtension.__wrap(ret);
    }
    /**
     * Set the supplied pair in the ContextExtension
     * @param {number} id
     * @param {Constant} value
     */
    set_pair(id, value) {
        _assertClass(value, Constant);
        wasm.contextextension_set_pair(this.ptr, id, value.ptr);
    }
    /**
     * Returns the number of elements in the collection
     * @returns {number}
     */
    len() {
        const ret = wasm.contextextension_len(this.ptr);
        return ret >>> 0;
    }
    /**
     * get from map or fail if key is missing
     * @param {number} key
     * @returns {Constant}
     */
    get(key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.contextextension_get(retptr, this.ptr, key);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Constant.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Returns all keys in the map
     * @returns {Uint8Array}
     */
    keys() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.contextextension_keys(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Returns serialized bytes or fails with error if ContextExtension cannot be serialized
     * @returns {Uint8Array}
     */
    sigma_serialize_bytes() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.contextextension_sigma_serialize_bytes(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.ContextExtension = ContextExtension;
/**
 * Defines the contract(script) that will be guarding box contents
 */
class Contract {
    static __wrap(ptr) {
        const obj = Object.create(Contract.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_contract_free(ptr);
    }
    /**
     * Create new contract from ErgoTree
     * @param {ErgoTree} ergo_tree
     * @returns {Contract}
     */
    static new(ergo_tree) {
        _assertClass(ergo_tree, ErgoTree);
        var ptr0 = ergo_tree.ptr;
        ergo_tree.ptr = 0;
        const ret = wasm.contract_new(ptr0);
        return Contract.__wrap(ret);
    }
    /**
     * create new contract that allow spending of the guarded box by a given recipient ([`Address`])
     * @param {Address} recipient
     * @returns {Contract}
     */
    static pay_to_address(recipient) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(recipient, Address);
            wasm.contract_pay_to_address(retptr, recipient.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Contract.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Get the ErgoTree of the contract
     * @returns {ErgoTree}
     */
    ergo_tree() {
        const ret = wasm.contract_ergo_tree(this.ptr);
        return ErgoTree.__wrap(ret);
    }
}
module.exports.Contract = Contract;
/**
 * Inputs, that are used to enrich script context, but won't be spent by the transaction
 */
class DataInput {
    static __wrap(ptr) {
        const obj = Object.create(DataInput.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_datainput_free(ptr);
    }
    /**
     * Parse box id (32 byte digest) from base16-encoded string
     * @param {BoxId} box_id
     */
    constructor(box_id) {
        _assertClass(box_id, BoxId);
        var ptr0 = box_id.ptr;
        box_id.ptr = 0;
        const ret = wasm.datainput_new(ptr0);
        return DataInput.__wrap(ret);
    }
    /**
     * Get box id
     * @returns {BoxId}
     */
    box_id() {
        const ret = wasm.datainput_box_id(this.ptr);
        return BoxId.__wrap(ret);
    }
}
module.exports.DataInput = DataInput;
/**
 * DataInput collection
 */
class DataInputs {
    static __wrap(ptr) {
        const obj = Object.create(DataInputs.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_datainputs_free(ptr);
    }
    /**
     * Create empty DataInputs
     */
    constructor() {
        const ret = wasm.datainputs_new();
        return DataInputs.__wrap(ret);
    }
    /**
     * Returns the number of elements in the collection
     * @returns {number}
     */
    len() {
        const ret = wasm.datainputs_len(this.ptr);
        return ret >>> 0;
    }
    /**
     * Returns the element of the collection with a given index
     * @param {number} index
     * @returns {DataInput}
     */
    get(index) {
        const ret = wasm.datainputs_get(this.ptr, index);
        return DataInput.__wrap(ret);
    }
    /**
     * Adds an elements to the collection
     * @param {DataInput} elem
     */
    add(elem) {
        _assertClass(elem, DataInput);
        wasm.datainputs_add(this.ptr, elem.ptr);
    }
}
module.exports.DataInputs = DataInputs;
/**
 * According to
 * BIP-44 <https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki>
 * and EIP-3 <https://github.com/ergoplatform/eips/blob/master/eip-0003.md>
 */
class DerivationPath {
    static __wrap(ptr) {
        const obj = Object.create(DerivationPath.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_derivationpath_free(ptr);
    }
    /**
     * Create derivation path for a given account index (hardened) and address indices
     * `m / 44' / 429' / acc' / 0 / address[0] / address[1] / ...`
     * or `m / 44' / 429' / acc' / 0` if address indices are empty
     * change is always zero according to EIP-3
     * acc is expected as a 31-bit value (32th bit should not be set)
     * @param {number} acc
     * @param {Uint32Array} address_indices
     * @returns {DerivationPath}
     */
    static new(acc, address_indices) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray32ToWasm0(
                address_indices,
                wasm.__wbindgen_malloc,
            );
            const len0 = WASM_VECTOR_LEN;
            wasm.derivationpath_new(retptr, acc, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return DerivationPath.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Create root derivation path
     * @returns {DerivationPath}
     */
    static master_path() {
        const ret = wasm.derivationpath_master_path();
        return DerivationPath.__wrap(ret);
    }
    /**
     * Returns the length of the derivation path
     * @returns {number}
     */
    depth() {
        const ret = wasm.derivationpath_depth(this.ptr);
        return ret >>> 0;
    }
    /**
     * Returns a new path with the last element of the deriviation path being increased, e.g. m/1/2 -> m/1/3
     * Returns an empty path error if the path is empty (master node)
     * @returns {DerivationPath}
     */
    next() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.derivationpath_next(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return DerivationPath.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * String representation of derivation path
     * E.g m/44'/429'/0'/0/1
     * @returns {string}
     */
    toString() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.derivationpath_toString(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
     * Create a derivation path from a formatted string
     * E.g "m/44'/429'/0'/0/1"
     * @param {string} path
     * @returns {DerivationPath}
     */
    static from_string(path) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(
                path,
                wasm.__wbindgen_malloc,
                wasm.__wbindgen_realloc,
            );
            const len0 = WASM_VECTOR_LEN;
            wasm.derivationpath_from_string(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return DerivationPath.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * For 0x21 Sign Transaction command of Ergo Ledger App Protocol
     * P2PK Sign (0x0D) instruction
     * Sign calculated TX hash with private key for provided BIP44 path.
     * Data:
     *
     * Field
     * Size (B)
     * Description
     *
     * BIP32 path length
     * 1
     * Value: 0x02-0x0A (2-10). Number of path components
     *
     * First derivation index
     * 4
     * Big-endian. Value: 44’
     *
     * Second derivation index
     * 4
     * Big-endian. Value: 429’ (Ergo coin id)
     *
     * Optional Third index
     * 4
     * Big-endian. Any valid bip44 hardened value.
     * ...
     * Optional Last index
     * 4
     * Big-endian. Any valid bip44 value.
     * @returns {Uint8Array}
     */
    ledger_bytes() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.derivationpath_ledger_bytes(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.DerivationPath = DerivationPath;
/**
 * Ergo box, that is taking part in some transaction on the chain
 * Differs with [`ErgoBoxCandidate`] by added transaction id and an index in the input of that transaction
 */
class ErgoBox {
    static __wrap(ptr) {
        const obj = Object.create(ErgoBox.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_ergobox_free(ptr);
    }
    /**
     * make a new box with:
     * `value` - amount of money associated with the box
     * `contract` - guarding contract([`Contract`]), which should be evaluated to true in order
     * to open(spend) this box
     * `creation_height` - height when a transaction containing the box is created.
     * `tx_id` - transaction id in which this box was "created" (participated in outputs)
     * `index` - index (in outputs) in the transaction
     * @param {BoxValue} value
     * @param {number} creation_height
     * @param {Contract} contract
     * @param {TxId} tx_id
     * @param {number} index
     * @param {Tokens} tokens
     */
    constructor(value, creation_height, contract, tx_id, index, tokens) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(value, BoxValue);
            _assertClass(contract, Contract);
            _assertClass(tx_id, TxId);
            _assertClass(tokens, Tokens);
            wasm.ergobox_new(
                retptr,
                value.ptr,
                creation_height,
                contract.ptr,
                tx_id.ptr,
                index,
                tokens.ptr,
            );
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ErgoBox.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Get box id
     * @returns {BoxId}
     */
    box_id() {
        const ret = wasm.ergobox_box_id(this.ptr);
        return BoxId.__wrap(ret);
    }
    /**
     * Get id of transaction which created the box
     * @returns {TxId}
     */
    tx_id() {
        const ret = wasm.ergobox_tx_id(this.ptr);
        return TxId.__wrap(ret);
    }
    /**
     * Index of this box in transaction outputs
     * @returns {number}
     */
    index() {
        const ret = wasm.ergobox_index(this.ptr);
        return ret;
    }
    /**
     * Get box creation height
     * @returns {number}
     */
    creation_height() {
        const ret = wasm.ergobox_creation_height(this.ptr);
        return ret >>> 0;
    }
    /**
     * Get tokens for box
     * @returns {Tokens}
     */
    tokens() {
        const ret = wasm.ergobox_tokens(this.ptr);
        return Tokens.__wrap(ret);
    }
    /**
     * Get ergo tree for box
     * @returns {ErgoTree}
     */
    ergo_tree() {
        const ret = wasm.ergobox_ergo_tree(this.ptr);
        return ErgoTree.__wrap(ret);
    }
    /**
     * Get box value in nanoERGs
     * @returns {BoxValue}
     */
    value() {
        const ret = wasm.ergobox_value(this.ptr);
        return BoxValue.__wrap(ret);
    }
    /**
     * Returns value (ErgoTree constant) stored in the register or None if the register is empty or cannot be parsed
     * @param {number} register_id
     * @returns {Constant | undefined}
     */
    register_value(register_id) {
        const ret = wasm.ergobox_register_value(this.ptr, register_id);
        return ret === 0 ? undefined : Constant.__wrap(ret);
    }
    /**
     * JSON representation as text (compatible with Ergo Node/Explorer API, numbers are encoded as numbers)
     * @returns {string}
     */
    to_json() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.ergobox_to_json(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            var ptr0 = r0;
            var len0 = r1;
            if (r3) {
                ptr0 = 0;
                len0 = 0;
                throw takeObject(r2);
            }
            return getStringFromWasm0(ptr0, len0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(ptr0, len0);
        }
    }
    /**
     * JSON representation according to EIP-12 <https://github.com/ergoplatform/eips/pull/23>
     * (similar to [`Self::to_json`], but as JS object with box value and token amounts encoding as strings)
     * @returns {any}
     */
    to_js_eip12() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.ergobox_to_js_eip12(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return takeObject(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * parse from JSON
     * supports Ergo Node/Explorer API and box values and token amount encoded as strings
     * @param {string} json
     * @returns {ErgoBox}
     */
    static from_json(json) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(
                json,
                wasm.__wbindgen_malloc,
                wasm.__wbindgen_realloc,
            );
            const len0 = WASM_VECTOR_LEN;
            wasm.ergobox_from_json(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ErgoBox.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Serialized additional register as defined in ErgoBox serialization (registers count,
     * followed by every non-empyt register value serialized)
     * @returns {Uint8Array}
     */
    serialized_additional_registers() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.ergobox_serialized_additional_registers(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Returns serialized bytes or fails with error if cannot be serialized
     * @returns {Uint8Array}
     */
    sigma_serialize_bytes() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.ergobox_sigma_serialize_bytes(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Parses ErgoBox or fails with error
     * @param {Uint8Array} data
     * @returns {ErgoBox}
     */
    static sigma_parse_bytes(data) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.ergobox_sigma_parse_bytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ErgoBox.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Create ErgoBox from ErgoBoxCandidate by adding transaction id
     * and index of the box in the transaction
     * @param {ErgoBoxCandidate} candidate
     * @param {TxId} tx_id
     * @param {number} index
     * @returns {ErgoBox}
     */
    static from_box_candidate(candidate, tx_id, index) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(candidate, ErgoBoxCandidate);
            _assertClass(tx_id, TxId);
            wasm.ergobox_from_box_candidate(
                retptr,
                candidate.ptr,
                tx_id.ptr,
                index,
            );
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ErgoBox.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.ErgoBox = ErgoBox;
/**
 * Pair of <value, tokens> for an box
 */
class ErgoBoxAssetsData {
    static __wrap(ptr) {
        const obj = Object.create(ErgoBoxAssetsData.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_ergoboxassetsdata_free(ptr);
    }
    /**
     * Create new instance
     * @param {BoxValue} value
     * @param {Tokens} tokens
     */
    constructor(value, tokens) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(value, BoxValue);
            _assertClass(tokens, Tokens);
            wasm.ergoboxassetsdata_new(retptr, value.ptr, tokens.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ErgoBoxAssetsData.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Value part of the box
     * @returns {BoxValue}
     */
    value() {
        const ret = wasm.ergoboxassetsdata_value(this.ptr);
        return BoxValue.__wrap(ret);
    }
    /**
     * Tokens part of the box
     * @returns {Tokens}
     */
    tokens() {
        const ret = wasm.ergoboxassetsdata_tokens(this.ptr);
        return Tokens.__wrap(ret);
    }
}
module.exports.ErgoBoxAssetsData = ErgoBoxAssetsData;
/**
 * List of asset data for a box
 */
class ErgoBoxAssetsDataList {
    static __wrap(ptr) {
        const obj = Object.create(ErgoBoxAssetsDataList.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_ergoboxassetsdatalist_free(ptr);
    }
    /**
     * Create empty Tokens
     */
    constructor() {
        const ret = wasm.ergoboxassetsdatalist_new();
        return ErgoBoxAssetsDataList.__wrap(ret);
    }
    /**
     * Returns the number of elements in the collection
     * @returns {number}
     */
    len() {
        const ret = wasm.ergoboxassetsdatalist_len(this.ptr);
        return ret >>> 0;
    }
    /**
     * Returns the element of the collection with a given index
     * @param {number} index
     * @returns {ErgoBoxAssetsData}
     */
    get(index) {
        const ret = wasm.ergoboxassetsdatalist_get(this.ptr, index);
        return ErgoBoxAssetsData.__wrap(ret);
    }
    /**
     * Adds an elements to the collection
     * @param {ErgoBoxAssetsData} elem
     */
    add(elem) {
        _assertClass(elem, ErgoBoxAssetsData);
        wasm.ergoboxassetsdatalist_add(this.ptr, elem.ptr);
    }
}
module.exports.ErgoBoxAssetsDataList = ErgoBoxAssetsDataList;
/**
 * ErgoBox candidate not yet included in any transaction on the chain
 */
class ErgoBoxCandidate {
    static __wrap(ptr) {
        const obj = Object.create(ErgoBoxCandidate.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_ergoboxcandidate_free(ptr);
    }
    /**
     * Create a box with miner's contract and given value
     * @param {BoxValue} fee_amount
     * @param {number} creation_height
     * @returns {ErgoBoxCandidate}
     */
    static new_miner_fee_box(fee_amount, creation_height) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(fee_amount, BoxValue);
            wasm.ergoboxcandidate_new_miner_fee_box(
                retptr,
                fee_amount.ptr,
                creation_height,
            );
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ErgoBoxCandidate.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Returns value (ErgoTree constant) stored in the register or None if the register is empty or cannot be parsed
     * @param {number} register_id
     * @returns {Constant | undefined}
     */
    register_value(register_id) {
        const ret = wasm.ergoboxcandidate_register_value(this.ptr, register_id);
        return ret === 0 ? undefined : Constant.__wrap(ret);
    }
    /**
     * Get box creation height
     * @returns {number}
     */
    creation_height() {
        const ret = wasm.ergoboxcandidate_creation_height(this.ptr);
        return ret >>> 0;
    }
    /**
     * Get tokens for box
     * @returns {Tokens}
     */
    tokens() {
        const ret = wasm.ergoboxcandidate_tokens(this.ptr);
        return Tokens.__wrap(ret);
    }
    /**
     * Get ergo tree for box
     * @returns {ErgoTree}
     */
    ergo_tree() {
        const ret = wasm.ergoboxcandidate_ergo_tree(this.ptr);
        return ErgoTree.__wrap(ret);
    }
    /**
     * Get box value in nanoERGs
     * @returns {BoxValue}
     */
    value() {
        const ret = wasm.ergoboxcandidate_value(this.ptr);
        return BoxValue.__wrap(ret);
    }
    /**
     * Serialized additional register as defined in ErgoBox serialization (registers count,
     * followed by every non-empyt register value serialized)
     * @returns {Uint8Array}
     */
    serialized_additional_registers() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.ergoboxcandidate_serialized_additional_registers(
                retptr,
                this.ptr,
            );
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.ErgoBoxCandidate = ErgoBoxCandidate;
/**
 * ErgoBoxCandidate builder
 */
class ErgoBoxCandidateBuilder {
    static __wrap(ptr) {
        const obj = Object.create(ErgoBoxCandidateBuilder.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_ergoboxcandidatebuilder_free(ptr);
    }
    /**
     * Create builder with required box parameters:
     * `value` - amount of money associated with the box
     * `contract` - guarding contract([`Contract`]), which should be evaluated to true in order
     * to open(spend) this box
     * `creation_height` - height when a transaction containing the box is created.
     * It should not exceed height of the block, containing the transaction with this box.
     * @param {BoxValue} value
     * @param {Contract} contract
     * @param {number} creation_height
     */
    constructor(value, contract, creation_height) {
        _assertClass(value, BoxValue);
        _assertClass(contract, Contract);
        const ret = wasm.ergoboxcandidatebuilder_new(
            value.ptr,
            contract.ptr,
            creation_height,
        );
        return ErgoBoxCandidateBuilder.__wrap(ret);
    }
    /**
     * Set minimal value (per byte of the serialized box size)
     * @param {number} new_min_value_per_byte
     */
    set_min_box_value_per_byte(new_min_value_per_byte) {
        wasm.ergoboxcandidatebuilder_set_min_box_value_per_byte(
            this.ptr,
            new_min_value_per_byte,
        );
    }
    /**
     * Get minimal value (per byte of the serialized box size)
     * @returns {number}
     */
    min_box_value_per_byte() {
        const ret = wasm.ergoboxcandidatebuilder_min_box_value_per_byte(
            this.ptr,
        );
        return ret >>> 0;
    }
    /**
     * Set new box value
     * @param {BoxValue} new_value
     */
    set_value(new_value) {
        _assertClass(new_value, BoxValue);
        var ptr0 = new_value.ptr;
        new_value.ptr = 0;
        wasm.ergoboxcandidatebuilder_set_value(this.ptr, ptr0);
    }
    /**
     * Get box value
     * @returns {BoxValue}
     */
    value() {
        const ret = wasm.ergoboxcandidatebuilder_value(this.ptr);
        return BoxValue.__wrap(ret);
    }
    /**
     * Calculate serialized box size(in bytes)
     * @returns {number}
     */
    calc_box_size_bytes() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.ergoboxcandidatebuilder_calc_box_size_bytes(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return r0 >>> 0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Calculate minimal box value for the current box serialized size(in bytes)
     * @returns {BoxValue}
     */
    calc_min_box_value() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.ergoboxcandidatebuilder_calc_min_box_value(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return BoxValue.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Set register with a given id (R4-R9) to the given value
     * @param {number} register_id
     * @param {Constant} value
     */
    set_register_value(register_id, value) {
        _assertClass(value, Constant);
        wasm.ergoboxcandidatebuilder_set_register_value(
            this.ptr,
            register_id,
            value.ptr,
        );
    }
    /**
     * Returns register value for the given register id (R4-R9), or None if the register is empty
     * @param {number} register_id
     * @returns {Constant | undefined}
     */
    register_value(register_id) {
        const ret = wasm.ergoboxcandidatebuilder_register_value(
            this.ptr,
            register_id,
        );
        return ret === 0 ? undefined : Constant.__wrap(ret);
    }
    /**
     * Delete register value(make register empty) for the given register id (R4-R9)
     * @param {number} register_id
     */
    delete_register_value(register_id) {
        wasm.ergoboxcandidatebuilder_delete_register_value(
            this.ptr,
            register_id,
        );
    }
    /**
     * Mint token, as defined in <https://github.com/ergoplatform/eips/blob/master/eip-0004.md>
     * `token` - token id(box id of the first input box in transaction) and token amount,
     * `token_name` - token name (will be encoded in R4),
     * `token_desc` - token description (will be encoded in R5),
     * `num_decimals` - number of decimals (will be encoded in R6)
     * @param {Token} token
     * @param {string} token_name
     * @param {string} token_desc
     * @param {number} num_decimals
     */
    mint_token(token, token_name, token_desc, num_decimals) {
        _assertClass(token, Token);
        const ptr0 = passStringToWasm0(
            token_name,
            wasm.__wbindgen_malloc,
            wasm.__wbindgen_realloc,
        );
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(
            token_desc,
            wasm.__wbindgen_malloc,
            wasm.__wbindgen_realloc,
        );
        const len1 = WASM_VECTOR_LEN;
        wasm.ergoboxcandidatebuilder_mint_token(
            this.ptr,
            token.ptr,
            ptr0,
            len0,
            ptr1,
            len1,
            num_decimals,
        );
    }
    /**
     * Add given token id and token amount
     * @param {TokenId} token_id
     * @param {TokenAmount} amount
     */
    add_token(token_id, amount) {
        _assertClass(token_id, TokenId);
        _assertClass(amount, TokenAmount);
        wasm.ergoboxcandidatebuilder_add_token(
            this.ptr,
            token_id.ptr,
            amount.ptr,
        );
    }
    /**
     * Build the box candidate
     * @returns {ErgoBoxCandidate}
     */
    build() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.ergoboxcandidatebuilder_build(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ErgoBoxCandidate.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.ErgoBoxCandidateBuilder = ErgoBoxCandidateBuilder;
/**
 * Collection of ErgoBoxCandidates
 */
class ErgoBoxCandidates {
    static __wrap(ptr) {
        const obj = Object.create(ErgoBoxCandidates.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_ergoboxcandidates_free(ptr);
    }
    /**
     * Create new outputs
     * @param {ErgoBoxCandidate} box_candidate
     */
    constructor(box_candidate) {
        _assertClass(box_candidate, ErgoBoxCandidate);
        const ret = wasm.ergoboxcandidates_new(box_candidate.ptr);
        return ErgoBoxCandidates.__wrap(ret);
    }
    /**
     * sometimes it's useful to keep track of an empty list
     * but keep in mind Ergo transactions need at least 1 output
     * @returns {ErgoBoxCandidates}
     */
    static empty() {
        const ret = wasm.ergoboxcandidates_empty();
        return ErgoBoxCandidates.__wrap(ret);
    }
    /**
     * Returns the number of elements in the collection
     * @returns {number}
     */
    len() {
        const ret = wasm.ergoboxcandidates_len(this.ptr);
        return ret >>> 0;
    }
    /**
     * Returns the element of the collection with a given index
     * @param {number} index
     * @returns {ErgoBoxCandidate}
     */
    get(index) {
        const ret = wasm.ergoboxcandidates_get(this.ptr, index);
        return ErgoBoxCandidate.__wrap(ret);
    }
    /**
     * Add an element to the collection
     * @param {ErgoBoxCandidate} b
     */
    add(b) {
        _assertClass(b, ErgoBoxCandidate);
        wasm.ergoboxcandidates_add(this.ptr, b.ptr);
    }
}
module.exports.ErgoBoxCandidates = ErgoBoxCandidates;
/**
 * Collection of ErgoBox'es
 */
class ErgoBoxes {
    static __wrap(ptr) {
        const obj = Object.create(ErgoBoxes.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_ergoboxes_free(ptr);
    }
    /**
     * parse ErgoBox array from json
     * @param {any[]} json_vals
     * @returns {ErgoBoxes}
     */
    static from_boxes_json(json_vals) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArrayJsValueToWasm0(
                json_vals,
                wasm.__wbindgen_malloc,
            );
            const len0 = WASM_VECTOR_LEN;
            wasm.ergoboxes_from_boxes_json(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ErgoBoxes.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Create new collection with one element
     * @param {ErgoBox} b
     */
    constructor(b) {
        _assertClass(b, ErgoBox);
        const ret = wasm.ergoboxes_new(b.ptr);
        return ErgoBoxes.__wrap(ret);
    }
    /**
     * Returns the number of elements in the collection
     * @returns {number}
     */
    len() {
        const ret = wasm.ergoboxes_len(this.ptr);
        return ret >>> 0;
    }
    /**
     * Add an element to the collection
     * @param {ErgoBox} b
     */
    add(b) {
        _assertClass(b, ErgoBox);
        wasm.ergoboxes_add(this.ptr, b.ptr);
    }
    /**
     * Returns the element of the collection with a given index
     * @param {number} index
     * @returns {ErgoBox}
     */
    get(index) {
        const ret = wasm.ergoboxes_get(this.ptr, index);
        return ErgoBox.__wrap(ret);
    }
    /**
     * Empty ErgoBoxes
     * @returns {ErgoBoxes}
     */
    static empty() {
        const ret = wasm.ergoboxcandidates_empty();
        return ErgoBoxes.__wrap(ret);
    }
}
module.exports.ErgoBoxes = ErgoBoxes;
/**
 * Blockchain state (last headers, etc.)
 */
class ErgoStateContext {
    static __wrap(ptr) {
        const obj = Object.create(ErgoStateContext.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_ergostatecontext_free(ptr);
    }
    /**
     * Create new context from pre-header
     * @param {PreHeader} pre_header
     * @param {BlockHeaders} headers
     */
    constructor(pre_header, headers) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(pre_header, PreHeader);
            var ptr0 = pre_header.ptr;
            pre_header.ptr = 0;
            _assertClass(headers, BlockHeaders);
            var ptr1 = headers.ptr;
            headers.ptr = 0;
            wasm.ergostatecontext_new(retptr, ptr0, ptr1);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ErgoStateContext.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.ErgoStateContext = ErgoStateContext;
/**
 * The root of ErgoScript IR. Serialized instances of this class are self sufficient and can be passed around.
 */
class ErgoTree {
    static __wrap(ptr) {
        const obj = Object.create(ErgoTree.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_ergotree_free(ptr);
    }
    /**
     * Decode from base16 encoded serialized ErgoTree
     * @param {string} s
     * @returns {ErgoTree}
     */
    static from_base16_bytes(s) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(
                s,
                wasm.__wbindgen_malloc,
                wasm.__wbindgen_realloc,
            );
            const len0 = WASM_VECTOR_LEN;
            wasm.ergotree_from_base16_bytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ErgoTree.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Decode from encoded serialized ErgoTree
     * @param {Uint8Array} data
     * @returns {ErgoTree}
     */
    static from_bytes(data) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.ergotree_from_bytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ErgoTree.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Returns serialized bytes or fails with error if ErgoTree cannot be serialized
     * @returns {Uint8Array}
     */
    sigma_serialize_bytes() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.ergotree_sigma_serialize_bytes(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Returns Base16-encoded serialized bytes
     * @returns {string}
     */
    to_base16_bytes() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.ergotree_to_base16_bytes(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            var ptr0 = r0;
            var len0 = r1;
            if (r3) {
                ptr0 = 0;
                len0 = 0;
                throw takeObject(r2);
            }
            return getStringFromWasm0(ptr0, len0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(ptr0, len0);
        }
    }
    /**
     * Returns constants number as stored in serialized ErgoTree or error if the parsing of
     * constants is failed
     * @returns {number}
     */
    constants_len() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.ergotree_constants_len(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return r0 >>> 0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Returns constant with given index (as stored in serialized ErgoTree)
     * or None if index is out of bounds
     * or error if constants parsing were failed
     * @param {number} index
     * @returns {Constant | undefined}
     */
    get_constant(index) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.ergotree_get_constant(retptr, this.ptr, index);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return r0 === 0 ? undefined : Constant.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Consumes the calling ErgoTree and returns new ErgoTree with a new constant value
     * for a given index in constants list (as stored in serialized ErgoTree), or an error.
     * After the call the calling ErgoTree will be null.
     * @param {number} index
     * @param {Constant} constant
     * @returns {ErgoTree}
     */
    with_constant(index, constant) {
        try {
            const ptr = this.__destroy_into_raw();
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(constant, Constant);
            wasm.ergotree_with_constant(retptr, ptr, index, constant.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ErgoTree.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Serialized proposition expression of SigmaProp type with
     * ConstantPlaceholder nodes instead of Constant nodes
     * @returns {Uint8Array}
     */
    template_bytes() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.ergotree_template_bytes(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.ErgoTree = ErgoTree;
/**
 * Extented public key implemented according to BIP-32
 */
class ExtPubKey {
    static __wrap(ptr) {
        const obj = Object.create(ExtPubKey.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_extpubkey_free(ptr);
    }
    /**
     * Create ExtPubKey from public key bytes (from SEC1 compressed), chain code and derivation
     * path
     * @param {Uint8Array} public_key_bytes
     * @param {Uint8Array} chain_code
     * @param {DerivationPath} derivation_path
     * @returns {ExtPubKey}
     */
    static new(public_key_bytes, chain_code, derivation_path) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(
                public_key_bytes,
                wasm.__wbindgen_malloc,
            );
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passArray8ToWasm0(chain_code, wasm.__wbindgen_malloc);
            const len1 = WASM_VECTOR_LEN;
            _assertClass(derivation_path, DerivationPath);
            wasm.extpubkey_new(
                retptr,
                ptr0,
                len0,
                ptr1,
                len1,
                derivation_path.ptr,
            );
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ExtPubKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Soft derivation of the child public key with a given index
     * index is expected to be a 31-bit value(32th bit should not be set)
     * @param {number} index
     * @returns {ExtPubKey}
     */
    child(index) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.extpubkey_child(retptr, this.ptr, index);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ExtPubKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Derive a new extended pub key from the derivation path
     * @param {DerivationPath} path
     * @returns {ExtPubKey}
     */
    derive(path) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(path, DerivationPath);
            var ptr0 = path.ptr;
            path.ptr = 0;
            wasm.extpubkey_derive(retptr, this.ptr, ptr0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ExtPubKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Create address (P2PK) from this extended public key
     * @returns {Address}
     */
    to_address() {
        const ret = wasm.extpubkey_to_address(this.ptr);
        return Address.__wrap(ret);
    }
    /**
     * Chain code of the `ExtPubKey`
     * @returns {Uint8Array}
     */
    chain_code() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.extpubkey_chain_code(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Public key bytes of the `ExtPubKey`
     * @returns {Uint8Array}
     */
    pub_key_bytes() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.extpubkey_pub_key_bytes(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.ExtPubKey = ExtPubKey;
/**
 * Extented secret key implemented according to BIP-32
 */
class ExtSecretKey {
    static __wrap(ptr) {
        const obj = Object.create(ExtSecretKey.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_extsecretkey_free(ptr);
    }
    /**
     * Create ExtSecretKey from secret key bytes, chain code and derivation path
     * @param {Uint8Array} secret_key_bytes
     * @param {Uint8Array} chain_code
     * @param {DerivationPath} derivation_path
     * @returns {ExtSecretKey}
     */
    static new(secret_key_bytes, chain_code, derivation_path) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(
                secret_key_bytes,
                wasm.__wbindgen_malloc,
            );
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passArray8ToWasm0(chain_code, wasm.__wbindgen_malloc);
            const len1 = WASM_VECTOR_LEN;
            _assertClass(derivation_path, DerivationPath);
            wasm.extsecretkey_new(
                retptr,
                ptr0,
                len0,
                ptr1,
                len1,
                derivation_path.ptr,
            );
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ExtSecretKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Derive root extended secret key
     * @param {Uint8Array} seed_bytes
     * @returns {ExtSecretKey}
     */
    static derive_master(seed_bytes) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(seed_bytes, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.extsecretkey_derive_master(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ExtSecretKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Derive a new extended secret key from the provided index
     * The index is in the form of soft or hardened indices
     * For example: 4 or 4' respectively
     * @param {string} index
     * @returns {ExtSecretKey}
     */
    child(index) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(
                index,
                wasm.__wbindgen_malloc,
                wasm.__wbindgen_realloc,
            );
            const len0 = WASM_VECTOR_LEN;
            wasm.extsecretkey_child(retptr, this.ptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ExtSecretKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Derive a new extended secret key from the derivation path
     * @param {DerivationPath} path
     * @returns {ExtSecretKey}
     */
    derive(path) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(path, DerivationPath);
            var ptr0 = path.ptr;
            path.ptr = 0;
            wasm.extsecretkey_derive(retptr, this.ptr, ptr0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ExtSecretKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * The bytes of the associated secret key
     * @returns {Uint8Array}
     */
    secret_key_bytes() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.extsecretkey_secret_key_bytes(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * The extended public key associated with this secret key
     * @returns {ExtPubKey}
     */
    public_key() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.extsecretkey_public_key(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ExtPubKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Derivation path associated with the ext secret key
     * @returns {DerivationPath}
     */
    path() {
        const ret = wasm.extsecretkey_path(this.ptr);
        return DerivationPath.__wrap(ret);
    }
}
module.exports.ExtSecretKey = ExtSecretKey;
/**
 * HintsBag
 */
class HintsBag {
    static __wrap(ptr) {
        const obj = Object.create(HintsBag.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_hintsbag_free(ptr);
    }
    /**
     * Empty HintsBag
     * @returns {HintsBag}
     */
    static empty() {
        const ret = wasm.hintsbag_empty();
        return HintsBag.__wrap(ret);
    }
    /**
     * Add commitment hint to the bag
     * @param {CommitmentHint} hint
     */
    add_commitment(hint) {
        _assertClass(hint, CommitmentHint);
        var ptr0 = hint.ptr;
        hint.ptr = 0;
        wasm.hintsbag_add_commitment(this.ptr, ptr0);
    }
    /**
     * Length of HintsBag
     * @returns {number}
     */
    len() {
        const ret = wasm.hintsbag_len(this.ptr);
        return ret >>> 0;
    }
    /**
     * Get commitment
     * @param {number} index
     * @returns {CommitmentHint}
     */
    get(index) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.hintsbag_get(retptr, this.ptr, index);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CommitmentHint.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.HintsBag = HintsBag;
/**
 * Wrapper for i64 for JS/TS because JS Number can only represent 53 bits
 * see <https://stackoverflow.com/questions/17320706/javascript-long-integer>
 */
class I64 {
    static __wrap(ptr) {
        const obj = Object.create(I64.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_i64_free(ptr);
    }
    /**
     * Create from a standard rust string representation
     * @param {string} string
     * @returns {I64}
     */
    static from_str(string) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(
                string,
                wasm.__wbindgen_malloc,
                wasm.__wbindgen_realloc,
            );
            const len0 = WASM_VECTOR_LEN;
            wasm.i64_from_str(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return I64.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * String representation of the value for use from environments that don't support i64
     * @returns {string}
     */
    to_str() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.i64_to_str(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
     * Get the value as JS number (64-bit float)
     * @returns {number}
     */
    as_num() {
        const ret = wasm.i64_as_num(this.ptr);
        return takeObject(ret);
    }
    /**
     * Addition with overflow check
     * @param {I64} other
     * @returns {I64}
     */
    checked_add(other) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(other, I64);
            wasm.i64_checked_add(retptr, this.ptr, other.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return I64.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.I64 = I64;
/**
 * Signed inputs used in signed transactions
 */
class Input {
    static __wrap(ptr) {
        const obj = Object.create(Input.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_input_free(ptr);
    }
    /**
     * Get box id
     * @returns {BoxId}
     */
    box_id() {
        const ret = wasm.input_box_id(this.ptr);
        return BoxId.__wrap(ret);
    }
    /**
     * Get the spending proof
     * @returns {ProverResult}
     */
    spending_proof() {
        const ret = wasm.input_spending_proof(this.ptr);
        return ProverResult.__wrap(ret);
    }
}
module.exports.Input = Input;
/**
 * Collection of signed inputs
 */
class Inputs {
    static __wrap(ptr) {
        const obj = Object.create(Inputs.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_inputs_free(ptr);
    }
    /**
     * Create empty Inputs
     */
    constructor() {
        const ret = wasm.inputs_new();
        return Inputs.__wrap(ret);
    }
    /**
     * Returns the number of elements in the collection
     * @returns {number}
     */
    len() {
        const ret = wasm.inputs_len(this.ptr);
        return ret >>> 0;
    }
    /**
     * Returns the element of the collection with a given index
     * @param {number} index
     * @returns {Input}
     */
    get(index) {
        const ret = wasm.inputs_get(this.ptr, index);
        return Input.__wrap(ret);
    }
}
module.exports.Inputs = Inputs;
/**
 * A level node in a merkle proof
 */
class LevelNode {
    static __wrap(ptr) {
        const obj = Object.create(LevelNode.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_levelnode_free(ptr);
    }
    /**
     * Creates a new LevelNode from a 32 byte hash and side that the node belongs on in the tree. Fails if the digest is not 32 bytes
     * @param {Uint8Array} hash
     * @param {number} side
     * @returns {LevelNode}
     */
    static new(hash, side) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(hash, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.levelnode_new(retptr, ptr0, len0, side);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return LevelNode.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Returns the associated digest (hash) with this node. Returns an empty array if there's no hash
     * @returns {Uint8Array}
     */
    get digest() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.levelnode_digest(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Returns the associated side with this node (0 = Left, 1 = Right)
     * @returns {number}
     */
    get side() {
        const ret = wasm.levelnode_side(this.ptr);
        return ret;
    }
}
module.exports.LevelNode = LevelNode;
/**
 * A MerkleProof type. Given leaf data and levels (bottom-upwards), the root hash can be computed and validated
 */
class MerkleProof {
    static __wrap(ptr) {
        const obj = Object.create(MerkleProof.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_merkleproof_free(ptr);
    }
    /**
     * Creates a new merkle proof with given leaf data and level data (bottom-upwards)
     * You can verify it against a Blakeb256 root hash by using [`Self::valid()`]
     * Add a node by using [`Self::add_node()`]
     * Each digest on the level must be exactly 32 bytes
     * @param {Uint8Array} leaf_data
     * @returns {MerkleProof}
     */
    static new(leaf_data) {
        const ptr0 = passArray8ToWasm0(leaf_data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.merkleproof_new(ptr0, len0);
        return MerkleProof.__wrap(ret);
    }
    /**
     * Adds a new node to the MerkleProof above the current nodes
     * @param {LevelNode} level
     */
    add_node(level) {
        _assertClass(level, LevelNode);
        wasm.merkleproof_add_node(this.ptr, level.ptr);
    }
    /**
     * Validates the Merkle proof against the root hash
     * @param {Uint8Array} expected_root
     * @returns {boolean}
     */
    valid(expected_root) {
        const ptr0 = passArray8ToWasm0(expected_root, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.merkleproof_valid(this.ptr, ptr0, len0);
        return ret !== 0;
    }
}
module.exports.MerkleProof = MerkleProof;
/**
 * helper methods to get the fee address for various networks
 */
class MinerAddress {
    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_mineraddress_free(ptr);
    }
    /**
     * Miner fee Base58 encoded P2S address on mainnet
     * @returns {string}
     */
    static mainnet_fee_address() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.mineraddress_mainnet_fee_address(retptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
     * Miner fee Base58 encoded P2S address on testnet
     * @returns {string}
     */
    static testnet_fee_address() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.mineraddress_testnet_fee_address(retptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
}
module.exports.MinerAddress = MinerAddress;
/**
 * Mnemonic
 */
class Mnemonic {
    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_mnemonic_free(ptr);
    }
    /**
     * Convert a mnemonic phrase into a mnemonic seed
     * mnemonic_pass is optional and is used to salt the seed
     * @param {string} mnemonic_phrase
     * @param {string} mnemonic_pass
     * @returns {Uint8Array}
     */
    static to_seed(mnemonic_phrase, mnemonic_pass) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(
                mnemonic_phrase,
                wasm.__wbindgen_malloc,
                wasm.__wbindgen_realloc,
            );
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passStringToWasm0(
                mnemonic_pass,
                wasm.__wbindgen_malloc,
                wasm.__wbindgen_realloc,
            );
            const len1 = WASM_VECTOR_LEN;
            wasm.mnemonic_to_seed(retptr, ptr0, len0, ptr1, len1);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v2 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.Mnemonic = Mnemonic;
/**
 * Combination of an Address with a network
 * These two combined together form a base58 encoding
 */
class NetworkAddress {
    static __wrap(ptr) {
        const obj = Object.create(NetworkAddress.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_networkaddress_free(ptr);
    }
    /**
     * create a new NetworkAddress(address + network prefix) for a given network type
     * @param {number} network
     * @param {Address} address
     * @returns {NetworkAddress}
     */
    static new(network, address) {
        _assertClass(address, Address);
        const ret = wasm.networkaddress_new(network, address.ptr);
        return NetworkAddress.__wrap(ret);
    }
    /**
     * Decode (base58) a NetworkAddress (address + network prefix) from string
     * @param {string} s
     * @returns {NetworkAddress}
     */
    static from_base58(s) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(
                s,
                wasm.__wbindgen_malloc,
                wasm.__wbindgen_realloc,
            );
            const len0 = WASM_VECTOR_LEN;
            wasm.networkaddress_from_base58(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return NetworkAddress.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Encode (base58) address
     * @returns {string}
     */
    to_base58() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.networkaddress_to_base58(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
     * Decode from a serialized address
     * @param {Uint8Array} data
     * @returns {NetworkAddress}
     */
    static from_bytes(data) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.networkaddress_from_bytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return NetworkAddress.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Encode address as serialized bytes
     * @returns {Uint8Array}
     */
    to_bytes() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.networkaddress_to_bytes(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Network for the address
     * @returns {number}
     */
    network() {
        const ret = wasm.networkaddress_network(this.ptr);
        return ret >>> 0;
    }
    /**
     * Get address without network information
     * @returns {Address}
     */
    address() {
        const ret = wasm.networkaddress_address(this.ptr);
        return Address.__wrap(ret);
    }
}
module.exports.NetworkAddress = NetworkAddress;
/**
 * A structure representing NiPoPow proof.
 */
class NipopowProof {
    static __wrap(ptr) {
        const obj = Object.create(NipopowProof.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_nipopowproof_free(ptr);
    }
    /**
     * Implementation of the ≥ algorithm from [`KMZ17`], see Algorithm 4
     *
     * [`KMZ17`]: https://fc20.ifca.ai/preproceedings/74.pdf
     * @param {NipopowProof} that
     * @returns {boolean}
     */
    is_better_than(that) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(that, NipopowProof);
            wasm.nipopowproof_is_better_than(retptr, this.ptr, that.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return r0 !== 0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * JSON representation as text
     * @returns {string}
     */
    to_json() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.nipopowproof_to_json(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            var ptr0 = r0;
            var len0 = r1;
            if (r3) {
                ptr0 = 0;
                len0 = 0;
                throw takeObject(r2);
            }
            return getStringFromWasm0(ptr0, len0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(ptr0, len0);
        }
    }
    /**
     * Get suffix head
     * @returns {PoPowHeader}
     */
    suffix_head() {
        const ret = wasm.nipopowproof_suffix_head(this.ptr);
        return PoPowHeader.__wrap(ret);
    }
    /**
     * Parse from JSON
     * supports Ergo Node/Explorer API and box values and token amount encoded as strings
     * @param {string} json
     * @returns {NipopowProof}
     */
    static from_json(json) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(
                json,
                wasm.__wbindgen_malloc,
                wasm.__wbindgen_realloc,
            );
            const len0 = WASM_VECTOR_LEN;
            wasm.nipopowproof_from_json(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return NipopowProof.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.NipopowProof = NipopowProof;
/**
 * A verifier for PoPoW proofs. During its lifetime, it processes many proofs with the aim of
 * deducing at any given point what is the best (sub)chain rooted at the specified genesis.
 */
class NipopowVerifier {
    static __wrap(ptr) {
        const obj = Object.create(NipopowVerifier.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_nipopowverifier_free(ptr);
    }
    /**
     * Create new instance
     * @param {BlockId} genesis_block_id
     */
    constructor(genesis_block_id) {
        _assertClass(genesis_block_id, BlockId);
        var ptr0 = genesis_block_id.ptr;
        genesis_block_id.ptr = 0;
        const ret = wasm.nipopowverifier_new(ptr0);
        return NipopowVerifier.__wrap(ret);
    }
    /**
     * Return best proof
     * @returns {NipopowProof | undefined}
     */
    best_proof() {
        const ret = wasm.nipopowverifier_best_proof(this.ptr);
        return ret === 0 ? undefined : NipopowProof.__wrap(ret);
    }
    /**
     * Returns chain of `BlockHeader`s from the best proof.
     * @returns {BlockHeaders}
     */
    best_chain() {
        const ret = wasm.nipopowverifier_best_chain(this.ptr);
        return BlockHeaders.__wrap(ret);
    }
    /**
     * Process given proof
     * @param {NipopowProof} new_proof
     */
    process(new_proof) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(new_proof, NipopowProof);
            var ptr0 = new_proof.ptr;
            new_proof.ptr = 0;
            wasm.nipopowverifier_process(retptr, this.ptr, ptr0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            if (r1) {
                throw takeObject(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.NipopowVerifier = NipopowVerifier;
/**
 * PoPowHeader structure. Represents the block header and unpacked interlinks
 */
class PoPowHeader {
    static __wrap(ptr) {
        const obj = Object.create(PoPowHeader.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_popowheader_free(ptr);
    }
    /**
     * Returns block header
     * @returns {BlockHeader}
     */
    header() {
        const ret = wasm.popowheader_header(this.ptr);
        return BlockHeader.__wrap(ret);
    }
    /**
     * Returns interlinks for PoPowHeader
     * @returns {any}
     */
    interlinks() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.popowheader_interlinks(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return takeObject(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Returns interlinks proof [`crate::batchmerkleproof::BatchMerkleProof`]
     * @returns {BatchMerkleProof}
     */
    interlinks_proof() {
        const ret = wasm.popowheader_interlinks_proof(this.ptr);
        return BatchMerkleProof.__wrap(ret);
    }
    /**
     * Validates interlinks merkle root with compact merkle multiproof. See [`PoPowHeader::interlinks_proof`] for BatchMerkleProof access
     * @returns {boolean}
     */
    check_interlinks_proof() {
        const ret = wasm.popowheader_check_interlinks_proof(this.ptr);
        return ret !== 0;
    }
    /**
     * Returns block height for Header
     * @returns {number}
     */
    height() {
        const ret = wasm.popowheader_height(this.ptr);
        return ret >>> 0;
    }
    /**
     * Returns Block ID for Header
     * @returns {BlockId}
     */
    id() {
        const ret = wasm.popowheader_id(this.ptr);
        return BlockId.__wrap(ret);
    }
}
module.exports.PoPowHeader = PoPowHeader;
/**
 * Block header with the current `spendingTransaction`, that can be predicted
 * by a miner before it's formation
 */
class PreHeader {
    static __wrap(ptr) {
        const obj = Object.create(PreHeader.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_preheader_free(ptr);
    }
    /**
     * Create using data from block header
     * @param {BlockHeader} block_header
     * @returns {PreHeader}
     */
    static from_block_header(block_header) {
        _assertClass(block_header, BlockHeader);
        var ptr0 = block_header.ptr;
        block_header.ptr = 0;
        const ret = wasm.preheader_from_block_header(ptr0);
        return PreHeader.__wrap(ret);
    }
}
module.exports.PreHeader = PreHeader;
/**
 * Propositions list(public keys)
 */
class Propositions {
    static __wrap(ptr) {
        const obj = Object.create(Propositions.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_propositions_free(ptr);
    }
    /**
     * Create empty proposition holder
     */
    constructor() {
        const ret = wasm.propositions_new();
        return Propositions.__wrap(ret);
    }
    /**
     * Adding new proposition
     * @param {Uint8Array} proposition
     */
    add_proposition_from_byte(proposition) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(proposition, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.propositions_add_proposition_from_byte(
                retptr,
                this.ptr,
                ptr0,
                len0,
            );
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            if (r1) {
                throw takeObject(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.Propositions = Propositions;
/**
 * Proof of correctness of tx spending
 */
class ProverResult {
    static __wrap(ptr) {
        const obj = Object.create(ProverResult.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_proverresult_free(ptr);
    }
    /**
     * Get proof
     * @returns {Uint8Array}
     */
    proof() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.proverresult_proof(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Get extension
     * @returns {ContextExtension}
     */
    extension() {
        const ret = wasm.proverresult_extension(this.ptr);
        return ContextExtension.__wrap(ret);
    }
    /**
     * JSON representation as text (compatible with Ergo Node/Explorer API, numbers are encoded as numbers)
     * @returns {string}
     */
    to_json() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.proverresult_to_json(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            var ptr0 = r0;
            var len0 = r1;
            if (r3) {
                ptr0 = 0;
                len0 = 0;
                throw takeObject(r2);
            }
            return getStringFromWasm0(ptr0, len0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(ptr0, len0);
        }
    }
}
module.exports.ProverResult = ProverResult;
/**
 * Represent `reduced` transaction, i.e. unsigned transaction where each unsigned input
 * is augmented with ReducedInput which contains a script reduction result.
 * After an unsigned transaction is reduced it can be signed without context.
 * Thus, it can be serialized and transferred for example to Cold Wallet and signed
 * in an environment where secrets are known.
 * see EIP-19 for more details -
 * <https://github.com/ergoplatform/eips/blob/f280890a4163f2f2e988a0091c078e36912fc531/eip-0019.md>
 */
class ReducedTransaction {
    static __wrap(ptr) {
        const obj = Object.create(ReducedTransaction.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_reducedtransaction_free(ptr);
    }
    /**
     * Returns `reduced` transaction, i.e. unsigned transaction where each unsigned input
     * is augmented with ReducedInput which contains a script reduction result.
     * @param {UnsignedTransaction} unsigned_tx
     * @param {ErgoBoxes} boxes_to_spend
     * @param {ErgoBoxes} data_boxes
     * @param {ErgoStateContext} state_context
     * @returns {ReducedTransaction}
     */
    static from_unsigned_tx(
        unsigned_tx,
        boxes_to_spend,
        data_boxes,
        state_context,
    ) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(unsigned_tx, UnsignedTransaction);
            _assertClass(boxes_to_spend, ErgoBoxes);
            _assertClass(data_boxes, ErgoBoxes);
            _assertClass(state_context, ErgoStateContext);
            wasm.reducedtransaction_from_unsigned_tx(
                retptr,
                unsigned_tx.ptr,
                boxes_to_spend.ptr,
                data_boxes.ptr,
                state_context.ptr,
            );
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ReducedTransaction.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Returns serialized bytes or fails with error if cannot be serialized
     * @returns {Uint8Array}
     */
    sigma_serialize_bytes() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.reducedtransaction_sigma_serialize_bytes(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Parses ReducedTransaction or fails with error
     * @param {Uint8Array} data
     * @returns {ReducedTransaction}
     */
    static sigma_parse_bytes(data) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.reducedtransaction_sigma_parse_bytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ReducedTransaction.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Returns the unsigned transaction
     * @returns {UnsignedTransaction}
     */
    unsigned_tx() {
        const ret = wasm.reducedtransaction_unsigned_tx(this.ptr);
        return UnsignedTransaction.__wrap(ret);
    }
}
module.exports.ReducedTransaction = ReducedTransaction;
/**
 * Secret key for the prover
 */
class SecretKey {
    static __wrap(ptr) {
        const obj = Object.create(SecretKey.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_secretkey_free(ptr);
    }
    /**
     * generate random key
     * @returns {SecretKey}
     */
    static random_dlog() {
        const ret = wasm.secretkey_random_dlog();
        return SecretKey.__wrap(ret);
    }
    /**
     * Parse dlog secret key from bytes (SEC-1-encoded scalar)
     * @param {Uint8Array} bytes
     * @returns {SecretKey}
     */
    static dlog_from_bytes(bytes) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.secretkey_dlog_from_bytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return SecretKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Parse Diffie-Hellman tuple secret key from bytes.
     * secret is expected as SEC-1-encoded scalar of 32 bytes,
     * g,h,u,v are expected as 33-byte compressed points
     * @param {Uint8Array} secret
     * @param {Uint8Array} g
     * @param {Uint8Array} h
     * @param {Uint8Array} u
     * @param {Uint8Array} v
     * @returns {SecretKey}
     */
    static dht_from_bytes(secret, g, h, u, v) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(secret, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passArray8ToWasm0(g, wasm.__wbindgen_malloc);
            const len1 = WASM_VECTOR_LEN;
            const ptr2 = passArray8ToWasm0(h, wasm.__wbindgen_malloc);
            const len2 = WASM_VECTOR_LEN;
            const ptr3 = passArray8ToWasm0(u, wasm.__wbindgen_malloc);
            const len3 = WASM_VECTOR_LEN;
            const ptr4 = passArray8ToWasm0(v, wasm.__wbindgen_malloc);
            const len4 = WASM_VECTOR_LEN;
            wasm.secretkey_dht_from_bytes(
                retptr,
                ptr0,
                len0,
                ptr1,
                len1,
                ptr2,
                len2,
                ptr3,
                len3,
                ptr4,
                len4,
            );
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return SecretKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Address (encoded public image)
     * @returns {Address}
     */
    get_address() {
        const ret = wasm.secretkey_get_address(this.ptr);
        return Address.__wrap(ret);
    }
    /**
     * Parse secret key from bytes (expected 32 bytes for Dlog, 32(secret)+33(g)+33(h)+33(u)+33(v)=164 bytes for DHT)
     * secret is expected as SEC-1-encoded scalar of 32 bytes,
     * g,h,u,v are expected as 33-byte compressed points
     * @param {Uint8Array} bytes
     * @returns {SecretKey}
     */
    static from_bytes(bytes) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.secretkey_from_bytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return SecretKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Serialized secret key (32 bytes for Dlog, 32(secret)+33(g)+33(h)+33(u)+33(v)=164 bytes for DHT)
     * DHT format is the same as in from_bytes
     * @returns {Uint8Array}
     */
    to_bytes() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.secretkey_to_bytes(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Parse secret key from JSON string (Dlog expected as base16-encoded bytes, DHT in node REST API format)
     * @param {string} json_str
     * @returns {SecretKey}
     */
    static from_json(json_str) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(
                json_str,
                wasm.__wbindgen_malloc,
                wasm.__wbindgen_realloc,
            );
            const len0 = WASM_VECTOR_LEN;
            wasm.secretkey_from_json(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return SecretKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Encode secret key to JSON string (Dlog as base16-encoded bytes, DHT in node REST API format)
     * @returns {string}
     */
    to_json() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.secretkey_to_json(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            var ptr0 = r0;
            var len0 = r1;
            if (r3) {
                ptr0 = 0;
                len0 = 0;
                throw takeObject(r2);
            }
            return getStringFromWasm0(ptr0, len0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(ptr0, len0);
        }
    }
}
module.exports.SecretKey = SecretKey;
/**
 * SecretKey collection
 */
class SecretKeys {
    static __wrap(ptr) {
        const obj = Object.create(SecretKeys.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_secretkeys_free(ptr);
    }
    /**
     * Create empty SecretKeys
     */
    constructor() {
        const ret = wasm.secretkeys_new();
        return SecretKeys.__wrap(ret);
    }
    /**
     * Returns the number of elements in the collection
     * @returns {number}
     */
    len() {
        const ret = wasm.secretkeys_len(this.ptr);
        return ret >>> 0;
    }
    /**
     * Returns the element of the collection with a given index
     * @param {number} index
     * @returns {SecretKey}
     */
    get(index) {
        const ret = wasm.secretkeys_get(this.ptr, index);
        return SecretKey.__wrap(ret);
    }
    /**
     * Adds an elements to the collection
     * @param {SecretKey} elem
     */
    add(elem) {
        _assertClass(elem, SecretKey);
        wasm.secretkeys_add(this.ptr, elem.ptr);
    }
}
module.exports.SecretKeys = SecretKeys;
/**
 * Naive box selector, collects inputs until target balance is reached
 */
class SimpleBoxSelector {
    static __wrap(ptr) {
        const obj = Object.create(SimpleBoxSelector.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_simpleboxselector_free(ptr);
    }
    /**
     * Create empty SimpleBoxSelector
     */
    constructor() {
        const ret = wasm.simpleboxselector_new();
        return SimpleBoxSelector.__wrap(ret);
    }
    /**
     * Selects inputs to satisfy target balance and tokens.
     * `inputs` - available inputs (returns an error, if empty),
     * `target_balance` - coins (in nanoERGs) needed,
     * `target_tokens` - amount of tokens needed.
     * Returns selected inputs and box assets(value+tokens) with change.
     * @param {ErgoBoxes} inputs
     * @param {BoxValue} target_balance
     * @param {Tokens} target_tokens
     * @returns {BoxSelection}
     */
    select(inputs, target_balance, target_tokens) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(inputs, ErgoBoxes);
            _assertClass(target_balance, BoxValue);
            _assertClass(target_tokens, Tokens);
            wasm.simpleboxselector_select(
                retptr,
                this.ptr,
                inputs.ptr,
                target_balance.ptr,
                target_tokens.ptr,
            );
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return BoxSelection.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.SimpleBoxSelector = SimpleBoxSelector;
/**
 * Token represented with token id paired with it's amount
 */
class Token {
    static __wrap(ptr) {
        const obj = Object.create(Token.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_token_free(ptr);
    }
    /**
     * Create a token with given token id and amount
     * @param {TokenId} token_id
     * @param {TokenAmount} amount
     */
    constructor(token_id, amount) {
        _assertClass(token_id, TokenId);
        _assertClass(amount, TokenAmount);
        const ret = wasm.token_new(token_id.ptr, amount.ptr);
        return Token.__wrap(ret);
    }
    /**
     * Get token id
     * @returns {TokenId}
     */
    id() {
        const ret = wasm.token_id(this.ptr);
        return TokenId.__wrap(ret);
    }
    /**
     * Get token amount
     * @returns {TokenAmount}
     */
    amount() {
        const ret = wasm.token_amount(this.ptr);
        return TokenAmount.__wrap(ret);
    }
    /**
     * JSON representation as text (compatible with Ergo Node/Explorer API, numbers are encoded as numbers)
     * @returns {string}
     */
    to_json() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.token_to_json(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            var ptr0 = r0;
            var len0 = r1;
            if (r3) {
                ptr0 = 0;
                len0 = 0;
                throw takeObject(r2);
            }
            return getStringFromWasm0(ptr0, len0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(ptr0, len0);
        }
    }
    /**
     * JSON representation according to EIP-12 <https://github.com/ergoplatform/eips/pull/23>
     * (similar to [`Self::to_json`], but as JS object with token amount encoding as string)
     * @returns {any}
     */
    to_js_eip12() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.token_to_js_eip12(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return takeObject(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.Token = Token;
/**
 * Token amount with bound checks
 */
class TokenAmount {
    static __wrap(ptr) {
        const obj = Object.create(TokenAmount.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_tokenamount_free(ptr);
    }
    /**
     * Create from i64 with bounds check
     * @param {I64} v
     * @returns {TokenAmount}
     */
    static from_i64(v) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(v, I64);
            wasm.tokenamount_from_i64(retptr, v.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return TokenAmount.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Get value as signed 64-bit long (I64)
     * @returns {I64}
     */
    as_i64() {
        const ret = wasm.tokenamount_as_i64(this.ptr);
        return I64.__wrap(ret);
    }
    /**
     * big-endian byte array representation
     * @returns {Uint8Array}
     */
    to_bytes() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.tokenamount_to_bytes(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.TokenAmount = TokenAmount;
/**
 * Token id (32 byte digest)
 */
class TokenId {
    static __wrap(ptr) {
        const obj = Object.create(TokenId.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_tokenid_free(ptr);
    }
    /**
     * Create token id from ergo box id (32 byte digest)
     * @param {BoxId} box_id
     * @returns {TokenId}
     */
    static from_box_id(box_id) {
        _assertClass(box_id, BoxId);
        const ret = wasm.tokenid_from_box_id(box_id.ptr);
        return TokenId.__wrap(ret);
    }
    /**
     * Parse token id (32 byte digest) from base16-encoded string
     * @param {string} str
     * @returns {TokenId}
     */
    static from_str(str) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(
                str,
                wasm.__wbindgen_malloc,
                wasm.__wbindgen_realloc,
            );
            const len0 = WASM_VECTOR_LEN;
            wasm.tokenid_from_str(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return TokenId.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Base16 encoded string
     * @returns {string}
     */
    to_str() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.tokenid_to_str(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
     * Returns byte array (32 bytes)
     * @returns {Uint8Array}
     */
    as_bytes() {
        const ret = wasm.tokenid_as_bytes(this.ptr);
        return takeObject(ret);
    }
}
module.exports.TokenId = TokenId;
/**
 * Array of tokens
 */
class Tokens {
    static __wrap(ptr) {
        const obj = Object.create(Tokens.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_tokens_free(ptr);
    }
    /**
     * Create empty Tokens
     */
    constructor() {
        const ret = wasm.tokens_new();
        return Tokens.__wrap(ret);
    }
    /**
     * Returns the number of elements in the collection
     * @returns {number}
     */
    len() {
        const ret = wasm.tokens_len(this.ptr);
        return ret >>> 0;
    }
    /**
     * Returns the element of the collection with a given index
     * @param {number} index
     * @returns {Token}
     */
    get(index) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.tokens_get(retptr, this.ptr, index);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Token.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Adds an elements to the collection
     * @param {Token} elem
     */
    add(elem) {
        _assertClass(elem, Token);
        wasm.tokens_add(this.ptr, elem.ptr);
    }
}
module.exports.Tokens = Tokens;
/**
 *
 * * ErgoTransaction is an atomic state transition operation. It destroys Boxes from the state
 * * and creates new ones. If transaction is spending boxes protected by some non-trivial scripts,
 * * its inputs should also contain proof of spending correctness - context extension (user-defined
 * * key-value map) and data inputs (links to existing boxes in the state) that may be used during
 * * script reduction to crypto, signatures that satisfies the remaining cryptographic protection
 * * of the script.
 * * Transactions are not encrypted, so it is possible to browse and view every transaction ever
 * * collected into a block.
 *
 */
class Transaction {
    static __wrap(ptr) {
        const obj = Object.create(Transaction.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transaction_free(ptr);
    }
    /**
     * Create Transaction from UnsignedTransaction and an array of proofs in the same order as
     * UnsignedTransaction.inputs with empty proof indicated with empty byte array
     * @param {UnsignedTransaction} unsigned_tx
     * @param {(Uint8Array)[]} proofs
     * @returns {Transaction}
     */
    static from_unsigned_tx(unsigned_tx, proofs) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(unsigned_tx, UnsignedTransaction);
            var ptr0 = unsigned_tx.ptr;
            unsigned_tx.ptr = 0;
            const ptr1 = passArrayJsValueToWasm0(
                proofs,
                wasm.__wbindgen_malloc,
            );
            const len1 = WASM_VECTOR_LEN;
            wasm.transaction_from_unsigned_tx(retptr, ptr0, ptr1, len1);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Transaction.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Get id for transaction
     * @returns {TxId}
     */
    id() {
        const ret = wasm.transaction_id(this.ptr);
        return TxId.__wrap(ret);
    }
    /**
     * JSON representation as text (compatible with Ergo Node/Explorer API, numbers are encoded as numbers)
     * @returns {string}
     */
    to_json() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.transaction_to_json(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            var ptr0 = r0;
            var len0 = r1;
            if (r3) {
                ptr0 = 0;
                len0 = 0;
                throw takeObject(r2);
            }
            return getStringFromWasm0(ptr0, len0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(ptr0, len0);
        }
    }
    /**
     * JSON representation according to EIP-12 <https://github.com/ergoplatform/eips/pull/23>
     * (similar to [`Self::to_json`], but as JS object with box value and token amount encoding as strings)
     * @returns {any}
     */
    to_js_eip12() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.transaction_to_js_eip12(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return takeObject(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * parse from JSON
     * supports Ergo Node/Explorer API and box values and token amount encoded as strings
     * @param {string} json
     * @returns {Transaction}
     */
    static from_json(json) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(
                json,
                wasm.__wbindgen_malloc,
                wasm.__wbindgen_realloc,
            );
            const len0 = WASM_VECTOR_LEN;
            wasm.transaction_from_json(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Transaction.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Inputs for transaction
     * @returns {Inputs}
     */
    inputs() {
        const ret = wasm.transaction_inputs(this.ptr);
        return Inputs.__wrap(ret);
    }
    /**
     * Data inputs for transaction
     * @returns {DataInputs}
     */
    data_inputs() {
        const ret = wasm.transaction_data_inputs(this.ptr);
        return DataInputs.__wrap(ret);
    }
    /**
     * Output candidates for transaction
     * @returns {ErgoBoxCandidates}
     */
    output_candidates() {
        const ret = wasm.transaction_output_candidates(this.ptr);
        return ErgoBoxCandidates.__wrap(ret);
    }
    /**
     * Returns ErgoBox's created from ErgoBoxCandidate's with tx id and indices
     * @returns {ErgoBoxes}
     */
    outputs() {
        const ret = wasm.transaction_outputs(this.ptr);
        return ErgoBoxes.__wrap(ret);
    }
    /**
     * Returns serialized bytes or fails with error if cannot be serialized
     * @returns {Uint8Array}
     */
    sigma_serialize_bytes() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.transaction_sigma_serialize_bytes(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Parses Transaction or fails with error
     * @param {Uint8Array} data
     * @returns {Transaction}
     */
    static sigma_parse_bytes(data) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.transaction_sigma_parse_bytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Transaction.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Check the signature of the transaction's input corresponding
     * to the given input box, guarded by P2PK script
     * @param {ErgoBox} input_box
     * @returns {boolean}
     */
    verify_p2pk_input(input_box) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(input_box, ErgoBox);
            var ptr0 = input_box.ptr;
            input_box.ptr = 0;
            wasm.transaction_verify_p2pk_input(retptr, this.ptr, ptr0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return r0 !== 0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.Transaction = Transaction;
/**
 * TransactionHintsBag
 */
class TransactionHintsBag {
    static __wrap(ptr) {
        const obj = Object.create(TransactionHintsBag.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transactionhintsbag_free(ptr);
    }
    /**
     * Empty TransactionHintsBag
     * @returns {TransactionHintsBag}
     */
    static empty() {
        const ret = wasm.transactionhintsbag_empty();
        return TransactionHintsBag.__wrap(ret);
    }
    /**
     * Adding hints for input
     * @param {number} index
     * @param {HintsBag} hints_bag
     */
    add_hints_for_input(index, hints_bag) {
        _assertClass(hints_bag, HintsBag);
        wasm.transactionhintsbag_add_hints_for_input(
            this.ptr,
            index,
            hints_bag.ptr,
        );
    }
    /**
     * Outputting HintsBag corresponding for an input index
     * @param {number} index
     * @returns {HintsBag}
     */
    all_hints_for_input(index) {
        const ret = wasm.transactionhintsbag_all_hints_for_input(
            this.ptr,
            index,
        );
        return HintsBag.__wrap(ret);
    }
    /**
     * Return JSON object (node format)
     * @returns {any}
     */
    to_json() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.transactionhintsbag_to_json(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return takeObject(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Parse from JSON object (node format)
     * @param {string} json
     * @returns {TransactionHintsBag}
     */
    static from_json(json) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(
                json,
                wasm.__wbindgen_malloc,
                wasm.__wbindgen_realloc,
            );
            const len0 = WASM_VECTOR_LEN;
            wasm.transactionhintsbag_from_json(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return TransactionHintsBag.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.TransactionHintsBag = TransactionHintsBag;
/**
 * Unsigned transaction builder
 */
class TxBuilder {
    static __wrap(ptr) {
        const obj = Object.create(TxBuilder.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_txbuilder_free(ptr);
    }
    /**
     * Suggested transaction fee (semi-default value used across wallets and dApps as of Oct 2020)
     * @returns {BoxValue}
     */
    static SUGGESTED_TX_FEE() {
        const ret = wasm.txbuilder_SUGGESTED_TX_FEE();
        return BoxValue.__wrap(ret);
    }
    /**
     * Creates new TxBuilder
     * `box_selection` - selected input boxes (via [`super::box_selector`])
     * `output_candidates` - output boxes to be "created" in this transaction,
     * `current_height` - chain height that will be used in additionally created boxes (change, miner's fee, etc.),
     * `fee_amount` - miner's fee,
     * `change_address` - change (inputs - outputs) will be sent to this address,
     * will be given to miners,
     * @param {BoxSelection} box_selection
     * @param {ErgoBoxCandidates} output_candidates
     * @param {number} current_height
     * @param {BoxValue} fee_amount
     * @param {Address} change_address
     * @returns {TxBuilder}
     */
    static new(
        box_selection,
        output_candidates,
        current_height,
        fee_amount,
        change_address,
    ) {
        _assertClass(box_selection, BoxSelection);
        _assertClass(output_candidates, ErgoBoxCandidates);
        _assertClass(fee_amount, BoxValue);
        _assertClass(change_address, Address);
        const ret = wasm.txbuilder_new(
            box_selection.ptr,
            output_candidates.ptr,
            current_height,
            fee_amount.ptr,
            change_address.ptr,
        );
        return TxBuilder.__wrap(ret);
    }
    /**
     * Set transaction's data inputs
     * @param {DataInputs} data_inputs
     */
    set_data_inputs(data_inputs) {
        _assertClass(data_inputs, DataInputs);
        wasm.txbuilder_set_data_inputs(this.ptr, data_inputs.ptr);
    }
    /**
     * Set context extension for a given input
     * @param {BoxId} box_id
     * @param {ContextExtension} context_extension
     */
    set_context_extension(box_id, context_extension) {
        _assertClass(box_id, BoxId);
        _assertClass(context_extension, ContextExtension);
        wasm.txbuilder_set_context_extension(
            this.ptr,
            box_id.ptr,
            context_extension.ptr,
        );
    }
    /**
     * Permits the burn of the given token amount, i.e. allows this token amount to be omitted in the outputs
     * @param {Tokens} tokens
     */
    set_token_burn_permit(tokens) {
        _assertClass(tokens, Tokens);
        wasm.txbuilder_set_token_burn_permit(this.ptr, tokens.ptr);
    }
    /**
     * Build the unsigned transaction
     * @returns {UnsignedTransaction}
     */
    build() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.txbuilder_build(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return UnsignedTransaction.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Get box selection
     * @returns {BoxSelection}
     */
    box_selection() {
        const ret = wasm.txbuilder_box_selection(this.ptr);
        return BoxSelection.__wrap(ret);
    }
    /**
     * Get data inputs
     * @returns {DataInputs}
     */
    data_inputs() {
        const ret = wasm.txbuilder_data_inputs(this.ptr);
        return DataInputs.__wrap(ret);
    }
    /**
     * Get outputs EXCLUDING fee and change
     * @returns {ErgoBoxCandidates}
     */
    output_candidates() {
        const ret = wasm.txbuilder_output_candidates(this.ptr);
        return ErgoBoxCandidates.__wrap(ret);
    }
    /**
     * Get current height
     * @returns {number}
     */
    current_height() {
        const ret = wasm.txbuilder_current_height(this.ptr);
        return ret >>> 0;
    }
    /**
     * Get fee amount
     * @returns {BoxValue}
     */
    fee_amount() {
        const ret = wasm.txbuilder_fee_amount(this.ptr);
        return BoxValue.__wrap(ret);
    }
    /**
     * Get change address
     * @returns {Address}
     */
    change_address() {
        const ret = wasm.txbuilder_change_address(this.ptr);
        return Address.__wrap(ret);
    }
}
module.exports.TxBuilder = TxBuilder;
/**
 * Transaction id
 */
class TxId {
    static __wrap(ptr) {
        const obj = Object.create(TxId.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_txid_free(ptr);
    }
    /**
     * Zero (empty) transaction id (to use as dummy value in tests)
     * @returns {TxId}
     */
    static zero() {
        const ret = wasm.txid_zero();
        return TxId.__wrap(ret);
    }
    /**
     * get the tx id as bytes
     * @returns {string}
     */
    to_str() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.txid_to_str(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
     * convert a hex string into a TxId
     * @param {string} s
     * @returns {TxId}
     */
    static from_str(s) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(
                s,
                wasm.__wbindgen_malloc,
                wasm.__wbindgen_realloc,
            );
            const len0 = WASM_VECTOR_LEN;
            wasm.txid_from_str(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return TxId.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.TxId = TxId;
/**
 * Unsigned inputs used in constructing unsigned transactions
 */
class UnsignedInput {
    static __wrap(ptr) {
        const obj = Object.create(UnsignedInput.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_unsignedinput_free(ptr);
    }
    /**
     * Create new unsigned input instance from box id and extension
     * @param {BoxId} box_id
     * @param {ContextExtension} ext
     */
    constructor(box_id, ext) {
        _assertClass(box_id, BoxId);
        _assertClass(ext, ContextExtension);
        const ret = wasm.unsignedinput_new(box_id.ptr, ext.ptr);
        return UnsignedInput.__wrap(ret);
    }
    /**
     * Create a new unsigned input from the provided box id
     * using an empty context extension
     * @param {BoxId} box_id
     * @returns {UnsignedInput}
     */
    static from_box_id(box_id) {
        _assertClass(box_id, BoxId);
        const ret = wasm.unsignedinput_from_box_id(box_id.ptr);
        return UnsignedInput.__wrap(ret);
    }
    /**
     * Get box id
     * @returns {BoxId}
     */
    box_id() {
        const ret = wasm.unsignedinput_box_id(this.ptr);
        return BoxId.__wrap(ret);
    }
    /**
     * Get extension
     * @returns {ContextExtension}
     */
    extension() {
        const ret = wasm.unsignedinput_extension(this.ptr);
        return ContextExtension.__wrap(ret);
    }
}
module.exports.UnsignedInput = UnsignedInput;
/**
 * Collection of unsigned signed inputs
 */
class UnsignedInputs {
    static __wrap(ptr) {
        const obj = Object.create(UnsignedInputs.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_unsignedinputs_free(ptr);
    }
    /**
     * Create empty UnsignedInputs
     */
    constructor() {
        const ret = wasm.inputs_new();
        return UnsignedInputs.__wrap(ret);
    }
    /**
     * Returns the number of elements in the collection
     * @returns {number}
     */
    len() {
        const ret = wasm.unsignedinputs_len(this.ptr);
        return ret >>> 0;
    }
    /**
     * Returns the element of the collection with a given index
     * @param {number} index
     * @returns {UnsignedInput}
     */
    get(index) {
        const ret = wasm.unsignedinputs_get(this.ptr, index);
        return UnsignedInput.__wrap(ret);
    }
    /**
     * Add an element to the collection
     * @param {UnsignedInput} b
     */
    add(b) {
        _assertClass(b, UnsignedInput);
        wasm.unsignedinputs_add(this.ptr, b.ptr);
    }
}
module.exports.UnsignedInputs = UnsignedInputs;
/**
 * Unsigned (inputs without proofs) transaction
 */
class UnsignedTransaction {
    static __wrap(ptr) {
        const obj = Object.create(UnsignedTransaction.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_unsignedtransaction_free(ptr);
    }
    /**
     * Create a new unsigned transaction
     * @param {UnsignedInputs} inputs
     * @param {DataInputs} data_inputs
     * @param {ErgoBoxCandidates} output_candidates
     */
    constructor(inputs, data_inputs, output_candidates) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(inputs, UnsignedInputs);
            _assertClass(data_inputs, DataInputs);
            _assertClass(output_candidates, ErgoBoxCandidates);
            wasm.unsignedtransaction_new(
                retptr,
                inputs.ptr,
                data_inputs.ptr,
                output_candidates.ptr,
            );
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return UnsignedTransaction.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Consumes the calling UnsignedTransaction and returns a new UnsignedTransaction containing
     * the ContextExtension in the provided input box id or returns an error if the input box cannot be found.
     * After the call the calling UnsignedTransaction will be null.
     * @param {BoxId} input_id
     * @param {ContextExtension} ext
     * @returns {UnsignedTransaction}
     */
    with_input_context_ext(input_id, ext) {
        try {
            const ptr = this.__destroy_into_raw();
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(input_id, BoxId);
            _assertClass(ext, ContextExtension);
            wasm.unsignedtransaction_with_input_context_ext(
                retptr,
                ptr,
                input_id.ptr,
                ext.ptr,
            );
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return UnsignedTransaction.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Get id for transaction
     * @returns {TxId}
     */
    id() {
        const ret = wasm.unsignedtransaction_id(this.ptr);
        return TxId.__wrap(ret);
    }
    /**
     * Inputs for transaction
     * @returns {UnsignedInputs}
     */
    inputs() {
        const ret = wasm.unsignedtransaction_inputs(this.ptr);
        return UnsignedInputs.__wrap(ret);
    }
    /**
     * Data inputs for transaction
     * @returns {DataInputs}
     */
    data_inputs() {
        const ret = wasm.unsignedtransaction_data_inputs(this.ptr);
        return DataInputs.__wrap(ret);
    }
    /**
     * Output candidates for transaction
     * @returns {ErgoBoxCandidates}
     */
    output_candidates() {
        const ret = wasm.unsignedtransaction_output_candidates(this.ptr);
        return ErgoBoxCandidates.__wrap(ret);
    }
    /**
     * JSON representation as text (compatible with Ergo Node/Explorer API, numbers are encoded as numbers)
     * @returns {string}
     */
    to_json() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.unsignedtransaction_to_json(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            var ptr0 = r0;
            var len0 = r1;
            if (r3) {
                ptr0 = 0;
                len0 = 0;
                throw takeObject(r2);
            }
            return getStringFromWasm0(ptr0, len0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(ptr0, len0);
        }
    }
    /**
     * JSON representation according to EIP-12 <https://github.com/ergoplatform/eips/pull/23>
     * (similar to [`Self::to_json`], but as JS object with box value and token amount encoding as strings)
     * @returns {any}
     */
    to_js_eip12() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.unsignedtransaction_to_js_eip12(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return takeObject(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * parse from JSON
     * supports Ergo Node/Explorer API and box values and token amount encoded as strings
     * @param {string} json
     * @returns {UnsignedTransaction}
     */
    static from_json(json) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(
                json,
                wasm.__wbindgen_malloc,
                wasm.__wbindgen_realloc,
            );
            const len0 = WASM_VECTOR_LEN;
            wasm.unsignedtransaction_from_json(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return UnsignedTransaction.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Returns distinct token id from output_candidates as array of byte arrays
     * @returns {(Uint8Array)[]}
     */
    distinct_token_ids() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.unsignedtransaction_distinct_token_ids(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v0 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.UnsignedTransaction = UnsignedTransaction;
/**
 * A collection of secret keys. This simplified signing by matching the secret keys to the correct inputs automatically.
 */
class Wallet {
    static __wrap(ptr) {
        const obj = Object.create(Wallet.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wallet_free(ptr);
    }
    /**
     * Create wallet instance loading secret key from mnemonic
     * Returns None if a DlogSecretKey cannot be parsed from the provided phrase
     * @param {string} mnemonic_phrase
     * @param {string} mnemonic_pass
     * @returns {Wallet}
     */
    static from_mnemonic(mnemonic_phrase, mnemonic_pass) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(
                mnemonic_phrase,
                wasm.__wbindgen_malloc,
                wasm.__wbindgen_realloc,
            );
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passStringToWasm0(
                mnemonic_pass,
                wasm.__wbindgen_malloc,
                wasm.__wbindgen_realloc,
            );
            const len1 = WASM_VECTOR_LEN;
            wasm.wallet_from_mnemonic(retptr, ptr0, len0, ptr1, len1);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Wallet.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Create wallet using provided secret key
     * @param {SecretKeys} secret
     * @returns {Wallet}
     */
    static from_secrets(secret) {
        _assertClass(secret, SecretKeys);
        const ret = wasm.wallet_from_secrets(secret.ptr);
        return Wallet.__wrap(ret);
    }
    /**
     * Add a secret to the wallets prover
     * @param {SecretKey} secret
     */
    add_secret(secret) {
        _assertClass(secret, SecretKey);
        wasm.wallet_add_secret(this.ptr, secret.ptr);
    }
    /**
     * Sign a transaction:
     * `tx` - transaction to sign
     * `boxes_to_spend` - boxes corresponding to [`UnsignedTransaction::inputs`]
     * `data_boxes` - boxes corresponding to [`UnsignedTransaction::data_inputs`]
     * @param {ErgoStateContext} _state_context
     * @param {UnsignedTransaction} tx
     * @param {ErgoBoxes} boxes_to_spend
     * @param {ErgoBoxes} data_boxes
     * @returns {Transaction}
     */
    sign_transaction(_state_context, tx, boxes_to_spend, data_boxes) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(_state_context, ErgoStateContext);
            _assertClass(tx, UnsignedTransaction);
            _assertClass(boxes_to_spend, ErgoBoxes);
            _assertClass(data_boxes, ErgoBoxes);
            wasm.wallet_sign_transaction(
                retptr,
                this.ptr,
                _state_context.ptr,
                tx.ptr,
                boxes_to_spend.ptr,
                data_boxes.ptr,
            );
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Transaction.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Sign a multi signature transaction:
     * `tx` - transaction to sign
     * `boxes_to_spend` - boxes corresponding to [`UnsignedTransaction::inputs`]
     * `data_boxes` - boxes corresponding to [`UnsignedTransaction::data_inputs`]
     * `tx_hints` - transaction hints bag corresponding to [`TransactionHintsBag`]
     * @param {ErgoStateContext} _state_context
     * @param {UnsignedTransaction} tx
     * @param {ErgoBoxes} boxes_to_spend
     * @param {ErgoBoxes} data_boxes
     * @param {TransactionHintsBag} tx_hints
     * @returns {Transaction}
     */
    sign_transaction_multi(
        _state_context,
        tx,
        boxes_to_spend,
        data_boxes,
        tx_hints,
    ) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(_state_context, ErgoStateContext);
            _assertClass(tx, UnsignedTransaction);
            _assertClass(boxes_to_spend, ErgoBoxes);
            _assertClass(data_boxes, ErgoBoxes);
            _assertClass(tx_hints, TransactionHintsBag);
            wasm.wallet_sign_transaction_multi(
                retptr,
                this.ptr,
                _state_context.ptr,
                tx.ptr,
                boxes_to_spend.ptr,
                data_boxes.ptr,
                tx_hints.ptr,
            );
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Transaction.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Sign a transaction:
     * `reduced_tx` - reduced transaction, i.e. unsigned transaction where for each unsigned input
     * added a script reduction result.
     * @param {ReducedTransaction} reduced_tx
     * @returns {Transaction}
     */
    sign_reduced_transaction(reduced_tx) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(reduced_tx, ReducedTransaction);
            wasm.wallet_sign_reduced_transaction(
                retptr,
                this.ptr,
                reduced_tx.ptr,
            );
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Transaction.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Sign a multi signature reduced transaction:
     * `reduced_tx` - reduced transaction, i.e. unsigned transaction where for each unsigned input
     * added a script reduction result.
     * `tx_hints` - transaction hints bag corresponding to [`TransactionHintsBag`]
     * @param {ReducedTransaction} reduced_tx
     * @param {TransactionHintsBag} tx_hints
     * @returns {Transaction}
     */
    sign_reduced_transaction_multi(reduced_tx, tx_hints) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(reduced_tx, ReducedTransaction);
            _assertClass(tx_hints, TransactionHintsBag);
            wasm.wallet_sign_reduced_transaction_multi(
                retptr,
                this.ptr,
                reduced_tx.ptr,
                tx_hints.ptr,
            );
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Transaction.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Generate Commitments for unsigned tx
     * @param {ErgoStateContext} _state_context
     * @param {UnsignedTransaction} tx
     * @param {ErgoBoxes} boxes_to_spend
     * @param {ErgoBoxes} data_boxes
     * @returns {TransactionHintsBag}
     */
    generate_commitments(_state_context, tx, boxes_to_spend, data_boxes) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(_state_context, ErgoStateContext);
            _assertClass(tx, UnsignedTransaction);
            _assertClass(boxes_to_spend, ErgoBoxes);
            _assertClass(data_boxes, ErgoBoxes);
            wasm.wallet_generate_commitments(
                retptr,
                this.ptr,
                _state_context.ptr,
                tx.ptr,
                boxes_to_spend.ptr,
                data_boxes.ptr,
            );
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return TransactionHintsBag.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Generate Commitments for reduced Transaction
     * @param {ReducedTransaction} reduced_tx
     * @returns {TransactionHintsBag}
     */
    generate_commitments_for_reduced_transaction(reduced_tx) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(reduced_tx, ReducedTransaction);
            wasm.wallet_generate_commitments_for_reduced_transaction(
                retptr,
                this.ptr,
                reduced_tx.ptr,
            );
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return TransactionHintsBag.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Sign an arbitrary message using a P2PK address
     * @param {Address} address
     * @param {Uint8Array} message
     * @returns {Uint8Array}
     */
    sign_message_using_p2pk(address, message) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(address, Address);
            const ptr0 = passArray8ToWasm0(message, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.wallet_sign_message_using_p2pk(
                retptr,
                this.ptr,
                address.ptr,
                ptr0,
                len0,
            );
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return takeObject(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.Wallet = Wallet;

module.exports.__wbindgen_object_drop_ref = function (arg0) {
    takeObject(arg0);
};

module.exports.__wbindgen_is_string = function (arg0) {
    const ret = typeof getObject(arg0) === 'string';
    return ret;
};

module.exports.__wbindgen_string_get = function (arg0, arg1) {
    const obj = getObject(arg1);
    const ret = typeof obj === 'string' ? obj : undefined;
    var ptr0 = isLikeNone(ret)
        ? 0
        : passStringToWasm0(
              ret,
              wasm.__wbindgen_malloc,
              wasm.__wbindgen_realloc,
          );
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

module.exports.__wbindgen_string_new = function (arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
};

module.exports.__wbindgen_object_clone_ref = function (arg0) {
    const ret = getObject(arg0);
    return addHeapObject(ret);
};

module.exports.__wbindgen_number_new = function (arg0) {
    const ret = arg0;
    return addHeapObject(ret);
};

module.exports.__wbindgen_ge = function (arg0, arg1) {
    const ret = getObject(arg0) >= getObject(arg1);
    return ret;
};

module.exports.__wbindgen_number_get = function (arg0, arg1) {
    const obj = getObject(arg1);
    const ret = typeof obj === 'number' ? obj : undefined;
    getFloat64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? 0 : ret;
    getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
};

module.exports.__wbindgen_is_bigint = function (arg0) {
    const ret = typeof getObject(arg0) === 'bigint';
    return ret;
};

module.exports.__wbindgen_is_undefined = function (arg0) {
    const ret = getObject(arg0) === undefined;
    return ret;
};

module.exports.__wbindgen_error_new = function (arg0, arg1) {
    const ret = new Error(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

module.exports.__wbg_new_abda76e883ba8a5f = function () {
    const ret = new Error();
    return addHeapObject(ret);
};

module.exports.__wbg_stack_658279fe44541cf6 = function (arg0, arg1) {
    const ret = getObject(arg1).stack;
    const ptr0 = passStringToWasm0(
        ret,
        wasm.__wbindgen_malloc,
        wasm.__wbindgen_realloc,
    );
    const len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

module.exports.__wbg_error_f851667af71bcfc6 = function (arg0, arg1) {
    try {
        console.error(getStringFromWasm0(arg0, arg1));
    } finally {
        wasm.__wbindgen_free(arg0, arg1);
    }
};

module.exports.__wbindgen_is_object = function (arg0) {
    const val = getObject(arg0);
    const ret = typeof val === 'object' && val !== null;
    return ret;
};

module.exports.__wbg_process_0cc2ada8524d6f83 = function (arg0) {
    const ret = getObject(arg0).process;
    return addHeapObject(ret);
};

module.exports.__wbg_versions_c11acceab27a6c87 = function (arg0) {
    const ret = getObject(arg0).versions;
    return addHeapObject(ret);
};

module.exports.__wbg_node_7ff1ce49caf23815 = function (arg0) {
    const ret = getObject(arg0).node;
    return addHeapObject(ret);
};

module.exports.__wbg_require_a746e79b322b9336 = function () {
    return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).require(getStringFromWasm0(arg1, arg2));
        return addHeapObject(ret);
    }, arguments);
};

module.exports.__wbg_crypto_2036bed7c44c25e7 = function (arg0) {
    const ret = getObject(arg0).crypto;
    return addHeapObject(ret);
};

module.exports.__wbg_msCrypto_a21fc88caf1ecdc8 = function (arg0) {
    const ret = getObject(arg0).msCrypto;
    return addHeapObject(ret);
};

module.exports.__wbg_getRandomValues_b99eec4244a475bb = function () {
    return handleError(function (arg0, arg1) {
        getObject(arg0).getRandomValues(getObject(arg1));
    }, arguments);
};

module.exports.__wbg_static_accessor_NODE_MODULE_cf6401cc1091279e =
    function () {
        const ret = module;
        return addHeapObject(ret);
    };

module.exports.__wbg_randomFillSync_065afffde01daa66 = function () {
    return handleError(function (arg0, arg1, arg2) {
        getObject(arg0).randomFillSync(getArrayU8FromWasm0(arg1, arg2));
    }, arguments);
};

module.exports.__wbg_new_1d9a920c6bfc44a8 = function () {
    const ret = new Array();
    return addHeapObject(ret);
};

module.exports.__wbg_BigInt_a49e18d7e4bf50d9 = function (arg0) {
    const ret = BigInt(getObject(arg0));
    return addHeapObject(ret);
};

module.exports.__wbg_newnoargs_b5b063fc6c2f0376 = function (arg0, arg1) {
    const ret = new Function(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

module.exports.__wbg_self_6d479506f72c6a71 = function () {
    return handleError(function () {
        const ret = self.self;
        return addHeapObject(ret);
    }, arguments);
};

module.exports.__wbg_window_f2557cc78490aceb = function () {
    return handleError(function () {
        const ret = window.window;
        return addHeapObject(ret);
    }, arguments);
};

module.exports.__wbg_globalThis_7f206bda628d5286 = function () {
    return handleError(function () {
        const ret = globalThis.globalThis;
        return addHeapObject(ret);
    }, arguments);
};

module.exports.__wbg_global_ba75c50d1cf384f4 = function () {
    return handleError(function () {
        const ret = global.global;
        return addHeapObject(ret);
    }, arguments);
};

module.exports.__wbg_get_57245cc7d7c7619d = function (arg0, arg1) {
    const ret = getObject(arg0)[arg1 >>> 0];
    return addHeapObject(ret);
};

module.exports.__wbg_isArray_27c46c67f498e15d = function (arg0) {
    const ret = Array.isArray(getObject(arg0));
    return ret;
};

module.exports.__wbg_length_6e3bbe7c8bd4dbd8 = function (arg0) {
    const ret = getObject(arg0).length;
    return ret;
};

module.exports.__wbg_push_740e4b286702d964 = function (arg0, arg1) {
    const ret = getObject(arg0).push(getObject(arg1));
    return ret;
};

module.exports.__wbg_BigInt_ef61f0cfdae62eeb = function () {
    return handleError(function (arg0) {
        const ret = BigInt(getObject(arg0));
        return addHeapObject(ret);
    }, arguments);
};

module.exports.__wbg_toString_d9cd5f001405e8ff = function () {
    return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).toString(arg1);
        return addHeapObject(ret);
    }, arguments);
};

module.exports.__wbg_toString_25dfcd34f7279704 = function (arg0, arg1, arg2) {
    const ret = getObject(arg1).toString(arg2);
    const ptr0 = passStringToWasm0(
        ret,
        wasm.__wbindgen_malloc,
        wasm.__wbindgen_realloc,
    );
    const len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

module.exports.__wbg_new_8d2af00bc1e329ee = function (arg0, arg1) {
    const ret = new Error(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

module.exports.__wbg_setname_d26cefd43ea3a082 = function (arg0, arg1, arg2) {
    getObject(arg0).name = getStringFromWasm0(arg1, arg2);
};

module.exports.__wbg_call_97ae9d8645dc388b = function () {
    return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
    }, arguments);
};

module.exports.__wbg_valueOf_6b6effad03e5c546 = function (arg0) {
    const ret = getObject(arg0).valueOf();
    return ret;
};

module.exports.__wbg_buffer_3f3d764d4747d564 = function (arg0) {
    const ret = getObject(arg0).buffer;
    return addHeapObject(ret);
};

module.exports.__wbg_newwithbyteoffsetandlength_d9aa266703cb98be = function (
    arg0,
    arg1,
    arg2,
) {
    const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};

module.exports.__wbg_new_8c3f0052272a457a = function (arg0) {
    const ret = new Uint8Array(getObject(arg0));
    return addHeapObject(ret);
};

module.exports.__wbg_instanceof_Uint8Array_971eeda69eb75003 = function (arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof Uint8Array;
    } catch {
        result = false;
    }
    const ret = result;
    return ret;
};

module.exports.__wbg_newwithlength_f5933855e4f48a19 = function (arg0) {
    const ret = new Uint8Array(arg0 >>> 0);
    return addHeapObject(ret);
};

module.exports.__wbg_subarray_58ad4efbb5bcb886 = function (arg0, arg1, arg2) {
    const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};

module.exports.__wbg_length_9e1ae1900cb0fbd5 = function (arg0) {
    const ret = getObject(arg0).length;
    return ret;
};

module.exports.__wbg_set_83db9690f9353e79 = function (arg0, arg1, arg2) {
    getObject(arg0).set(getObject(arg1), arg2 >>> 0);
};

module.exports.__wbg_parse_e23be3fecd886e2a = function () {
    return handleError(function (arg0, arg1) {
        const ret = JSON.parse(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    }, arguments);
};

module.exports.__wbg_stringify_d6471d300ded9b68 = function () {
    return handleError(function (arg0) {
        const ret = JSON.stringify(getObject(arg0));
        return addHeapObject(ret);
    }, arguments);
};

module.exports.__wbindgen_debug_string = function (arg0, arg1) {
    const ret = debugString(getObject(arg1));
    const ptr0 = passStringToWasm0(
        ret,
        wasm.__wbindgen_malloc,
        wasm.__wbindgen_realloc,
    );
    const len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

module.exports.__wbindgen_throw = function (arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

module.exports.__wbindgen_memory = function () {
    const ret = wasm.memory;
    return addHeapObject(ret);
};

// const path = require('path').join(__dirname, 'ergo_lib_wasm_bg.wasm');
// const bytes = require('fs').readFileSync(path);

fetch('/wasm/ergo_lib_wasm_bg.wasm')
    .then((response) => response.arrayBuffer())
    .then((bytes) => {
        const wasmModule = new WebAssembly.Module(bytes);
        const wasmInstance = new WebAssembly.Instance(wasmModule, imports);
        wasm = wasmInstance.exports;
    });

module.exports.__wasm = wasm;
