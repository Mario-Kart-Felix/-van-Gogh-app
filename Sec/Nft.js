import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Paintings from '../contracts/PaitingsNFT.json';
import Web3 from 'web3';

export const initWeb3 = createAsyncThunk(
    'InitWeb3',
    async(data, thunkApi)=> {
        try {
            if(Web3.givenProvider) {
                const web3 = new Web3(Web3.givenProvider);
                await Web3.givenProvider.enable();
                const networdId = await web3.eth.net.getId();
                const network = Paintings.networks[networdId];
                const contract = new web3.eth.Contract(Paintings.abi, network.address);
                const addresses = await web3.eth.getAccounts();
                               
                return {
                    web3,
                    contract,
                    address: addresses[0]
                }
    
            } else {
                console.log("error in web3  ");
            }
        } catch(error) {
            console.log("Error in loading blockchain");
        }
    }
);

export const addPainting = createAsyncThunk(
    'AddPainting',
    async(data, thunkApi)=> {
        const{contract, address} = thunkApi.getState().paintingReducer;
        const{name, price, description, path} = data;
        const response = await contract.methods.addPainting(name, price, path, description).send({from: address});   
    }
);

export const paintingsCount = createAsyncThunk(
    'PaintingsCount',
    async(data, thunkApi)=> {

        const{contract, address} = thunkApi.getState().paintingReducer;
        const response = await contract.methods.paintingsCount().call();
        
        return {
            count: Number(response)
        }
    }
);

export const getAllPaintings = createAsyncThunk(
    'GetAllPaintings',
    async(data, thunkApi)=> {

        const{contract, address} = thunkApi.getState().paintingReducer;
        const list = [];
        for(let i=0; i<data; i++) {
            const {
                name,
                price,
                description,
                imageHash,
                tokenId,
                owner
            } = await contract.methods.getPaintingById(i).call();
            
            let obj = {
                name,
                price, 
                description,
                imageHash,
                tokenId,
                owner
            }
            list.push(obj);
        }
        return {
            list
        }
    }
);

export const transferNft = createAsyncThunk(
    'TransferNFT',
    async(data, thunkApi) => {
        const{contract, address} = thunkApi.getState().paintingReducer;
        //console.log("transfer addres", transferAddress, id);
        const {transferAddress, id} = data;
        const response = contract.methods.safeTransferFrom(address, transferAddress, id).send({from: address});
        console.log("response", response);
    }
);

export const paintingSlice = createSlice({
    name: "painting",
    initialState: {
        contract: null,
        web3: null,
        address: null,
        count: null,
        loading: false,
        loading2: false,
        list: []
    },
    reducers: {
        adopt: ()=> {

        },
    },
    extraReducers: {
        [initWeb3.fulfilled]: (state, action)=> {
            state.web3 = action.payload.web3;
            state.contract = action.payload.contract;
            state.address = action.payload.address;
        }, 
        [addPainting.fulfilled]: (state, action) => {
            state.loading = false
        },
        [addPainting.pending]: (state, action) => {
            state.loading = true
        },
        [paintingsCount.fulfilled]: (state, action) => {
            state.count = action.payload.count
        },  
        [getAllPaintings.fulfilled]: (state, action) => {
            state.list = action.payload.list
            state.loading2 = false
        },
         
        [getAllPaintings.pending]: (state, action) => {
            state.loading2 = true
        },
        [transferNft.fulfilled]: (state, action ) => {
            console.log("transferNFT FULLFILLED");
        },
    }
 });

export const paintingReducer = paintingSlice.reducer;
export const { adopt } = paintingSlice.actions;
