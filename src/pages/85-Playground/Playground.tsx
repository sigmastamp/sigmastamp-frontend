import styled from 'styled-components';
import { ErgoConnectorButton } from './ErgoConnectorButton';
import { ErgoLibWasmTest } from './ErgoLibWasmTest';

export function PlaygroundPage() {
    return (
        <PlaygroundPageDiv>
            <h2>Playground</h2>
            <h2>@nautilus</h2>
            <ErgoConnectorButton />

            <h2>ergo-lib-wasm-browser</h2>
            <ErgoLibWasmTest />
            
        </PlaygroundPageDiv>
    );
}

const PlaygroundPageDiv = styled.div``;
