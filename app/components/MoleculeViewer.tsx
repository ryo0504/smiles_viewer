'use client';

import React, { useEffect, useRef } from 'react';
// @ts-ignore
import * as $3Dmol from '3dmol';

interface MoleculeViewerProps {
    molblock: string;
}

const MoleculeViewer: React.FC<MoleculeViewerProps> = ({ molblock }) => {
    const viewerRef = useRef<HTMLDivElement>(null);
    const viewerInstance = useRef<any>(null);

    useEffect(() => {
        if (!viewerRef.current) return;

        // Initialize viewer if not already done
        if (!viewerInstance.current) {
            const config = { backgroundColor: 'white' };
            viewerInstance.current = $3Dmol.createViewer(viewerRef.current, config);
        }

        const viewer = viewerInstance.current;
        viewer.removeAllModels();
        if (molblock) {
            viewer.addModel(molblock, "sdf");
            viewer.setStyle({}, { stick: {} });
            viewer.zoomTo();
            viewer.render();
        }

    }, [molblock]);

    return (
        <div
            ref={viewerRef}
            style={{ width: '100%', height: '400px', position: 'relative' }}
            className="border rounded-lg shadow-md bg-white"
        />
    );
};

export default MoleculeViewer;
