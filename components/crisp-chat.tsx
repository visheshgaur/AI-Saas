"use client"

import {Crisp} from "crisp-sdk-web";
import { useEffect } from "react";

export const Crispchat=()=>{
    useEffect(()=>{
        Crisp.configure("35a748dd-6319-431a-8c3a-cd5b4ec09243")
    },[])

    return null;
}
