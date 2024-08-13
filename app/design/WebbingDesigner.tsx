/**
 * @file WebbingDesigner.tsx
 * @author Riley Horrix (riley@horrix.com)
 * @brief Webbing designer component
 * @version 0.1
 * @date 2024-08-08
 * 
 * Copyright (c) Riley Horrix 2024
 * 
 */

import WebbingState, { emptyLayerState, LayerState, WebbingFonts, WebbingLayer } from "@/lib/webbingState"
import { StateFuncs } from "@/app/design/page"

import styles from "./WebbingDesign.module.css";

import React, { useEffect, useMemo, useState } from "react";
import WebbingSlider from "../../components/webbing/WebbingSlider";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, SharedSelection, Slider } from "@nextui-org/react";
import HorizontalDivider from "@/components/HorizontalDivider";

interface Props {
  state: WebbingState,
  stateFuncs: StateFuncs
}

/**
 * The webbing designer component allows a user to change or create a webbing design.
 * @param state The WebbingState object.
 * @param stateFuncs The WebbingState mutator functions of type StateFuncs.
 * @returns 
 */
export default function WebbingDesigner({ state, stateFuncs }: Props) {
  const layerIds = state.layers.map((item) => item.id);
  const newLayerId = () => {
    var id = layerIds.length;

    // Check to see if user is trying to be naughty
    while (layerIds.some((item) => item === ("Layer " + id.toString()))) {
      id += 1;
    }

    return "Layer " + id.toString();
  }
  const newlayer: () => WebbingLayer = () => {
    const emptyLayer = emptyLayerState();
    emptyLayer.id = newLayerId();
    return emptyLayer;
  }



  const [selectedLayerId, setSelectedLayerId] = useState<string>("");

  const defaultLayer = emptyLayerState();
  const selectedLayers = state.layers.filter((item) => item.id === selectedLayerId);
  const selectedLayer = selectedLayers.length === 0 ? defaultLayer : selectedLayers[0];

  const setLayerState = (state: LayerState) => {
    stateFuncs.editLayer(selectedLayerId, "state", state);
  }

  const setLayerBackground = (bg: string) => {
    stateFuncs.editLayer(selectedLayerId, "bgColor", bg);
  }

  const renderAdvancedEditor = () => {
    switch (selectedLayer.state) {
      case LayerState.NONE:
        return null;
      case LayerState.TEXT:
        return <div>TEXT</div>
      case LayerState.LOGO:
        return <div>LOGO</div>
    }
  }

  return (
    <div className={styles.container}>
      {/* TODO - change to a custom input field. */}
      <h1><i>{state.name}</i>{' '}<i className="bi bi-pencil-square"></i></h1>
      <HorizontalDivider />
      <WebbingSlider label="Angle" min={-90} max={90} step={1} start={0} init={state.angle} valueDisplay={(num) => `${num} deg`} onChangeFunc={(val) => { stateFuncs.setWebbingAnlge(val) }} tooltip="The angle that the design is rotated on the webbing." />
      <HorizontalDivider />
      <div className="flex flex-row justify-between w-full">
        <LayerSelect layers={layerIds} selectLayer={(layer) => setSelectedLayerId(layer)} />
        <Button endContent={<i className="bi bi-plus-circle-fill"></i>} onPress={() => { stateFuncs.appendLayer(newlayer()); }}>Add new layer</Button>
      </div>
      {selectedLayerId && (
        <>
          <WebbingSlider label="Horizontal Spacing" min={0} max={50} step={1} init={selectedLayer.hspace} valueDisplay={(num) => `${num} pixels`} onChangeFunc={(val) => { stateFuncs.setWebbingAnlge(val) }} tooltip="The horizontal space between elements in this layer." />
          <WebbingSlider label="Vertical Spacing" min={0} max={50} step={1} init={selectedLayer.vspace} valueDisplay={(num) => `${num} pixels`} onChangeFunc={(val) => { stateFuncs.setWebbingAnlge(val) }} tooltip="The vertical space between other layers and this layer." />
          <WebbingSlider label="Size" min={10} max={200} step={1} init={selectedLayer.size} valueDisplay={(num) => `${num} pixels`} onChangeFunc={(val) => { stateFuncs.setWebbingAnlge(val) }} tooltip="The text font size or the width of the image on the webbing." />
          <WebbingSlider label="Row Offset" min={0} max={10} step={1} init={selectedLayer.rowoff} valueDisplay={(num) => `${num} rows`} onChangeFunc={(val) => { stateFuncs.setWebbingAnlge(val) }} tooltip="How many rows it takes for this layer to repeat itself. (WARNING can cause design to become non-repeating)" />
          {/* TODO : if you drag picker it re-renders webbing multiple times. */}
          <Input size="md" type="color" label="Background Color" variant="bordered" placeholder={selectedLayer.bgColor} onChange={((val) => setLayerBackground(val.target.value))} classNames={{ base: "max-w-lg my-2", label: "text-lg" }} />
          <div className="flex flex-row justify-around w-full mt-2">
            <Button startContent={<i className="bi bi-fonts"></i>} onPress={() => setLayerState(LayerState.TEXT)}>Use Text</Button>
            <Button startContent={<i className="bi bi-image"></i>} onPress={() => setLayerState(LayerState.LOGO)}>Use Logo</Button>
          </div>
          {renderAdvancedEditor()}
        </>
      )}
    </div>
  );
}

interface LayerSelectProps {
  layers: string[],
  selectLayer: (arg0: string) => void
}

function LayerSelect({ layers, selectLayer }: LayerSelectProps) {
  const [selectedValue, setSelected] = useState("Select Layer");

  const handleSelectLayer = (val: SharedSelection) => {
    const value = val.currentKey ? val.currentKey : "Select Layer";
    setSelected(value);
    selectLayer(value);
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          className="capitalize"
        >
          {selectedValue}
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label="Layer selection"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedValue}
        // onSelectionChange={handleSelected}
        onSelectionChange={handleSelectLayer}
      >
        {layers.map((item) => {
          return (
            <DropdownItem key={item}>{item}</DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
}