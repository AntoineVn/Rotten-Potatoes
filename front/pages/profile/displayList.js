import React, { useState, useEffect, forwardRef } from 'react';
import Link from "next/link";
import { PaperClipIcon } from '@heroicons/react/solid';

const DisplayLists = forwardRef(({ list }, ref) => {
    console.log(list)

    return (
        <div className="grid grid-cols-1 md:grid-cols-6">
            <div className="flex flex-wrap">
                <div className="rounded-lg w-30 h-20 border-gray-50 border-2 flex flex-col gap-2">
                    {list.name}
                </div>
            </div>
        </div>


    )
})
export default DisplayLists