"use client";
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

import WebbingState, { allWebbingFonts, emptyLayerState, fontEnumToString, LayerState, stringToFontEnum, WebbingFonts, WebbingLayer } from "@/lib/webbingState"
import { StateFuncs } from "@/app/design/page"

import React, { useState } from "react";
import { Button, Checkbox, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, SharedSelection, Slider } from "@nextui-org/react";
import HorizontalDivider from "@/components/HorizontalDivider";
import WebbingSlider from "@/components/webbing/Slider";

interface Props {
  state: WebbingState,
  stateFuncs: StateFuncs
}

const defaultLayer = emptyLayerState();

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

  const layers = state.layers.filter((layer) => layer.id == selectedLayerId);
  const selectedLayer = layers.length ? layers[0] : defaultLayer;

  const setLayerState = (state: LayerState) => {
    stateFuncs.editLayer(selectedLayerId, "state", state);
  }

  const setLayerBackground = (bg: string) => {
    stateFuncs.editLayer(selectedLayerId, "bgColor", bg);
  }

  const renderAdvancedEditor = () => {
    if (!selectedLayer) return;
    switch (selectedLayer.state) {
      case LayerState.NONE:
        return null;

      case LayerState.TEXT:
        console.log("render")
        return (
          <div className="py-3 w-full flex flex-col">
            <Input type="text" label="Webbing Text" variant="flat" placeholder="Webbing Text Here..." value={selectedLayer.text} onValueChange={(val) => { stateFuncs.editLayer(selectedLayerId, "text", val) }} defaultValue={selectedLayer.text} />
            <div className="w-full flex flex-col sm:flex-row gap-y-3 sm:gap-y-0 justify-between items-center py-3">
              <FontSelect changeFont={(val) => { stateFuncs.editLayer(selectedLayerId, "font", val) }} font={selectedLayer.font} className="w-full sm:w-1/2" />
              <Input size="md" type="color" label="Font Color" variant="flat" placeholder={selectedLayer.bgColor} onChange={((val) => stateFuncs.editLayer(selectedLayerId, "fontColor", val.target.value))} classNames={{ base: "w-full sm:w-1/2", label: "text-lg" }} defaultValue={selectedLayer.fontColor} />
            </div>
            <Checkbox color="primary" classNames={{ base: "mb-2", label: "text-black" }} isSelected={selectedLayer.bold} onValueChange={(val) => { stateFuncs.editLayer(selectedLayerId, "bold", val) }}>Bold</Checkbox>
            <Button color="danger" className="w-full" onPress={() => stateFuncs.editLayer(selectedLayerId, "state", LayerState.NONE)}>Remove Text</Button>
          </div>
        );

      case LayerState.LOGO:
        return (
          <div className="py-3 w-full flex flex-col">
            <ImageUpload setImageData={(val) => stateFuncs.editLayer(selectedLayerId, "img", val)} />
            <Button color="danger" className="w-full mt-3" onPress={() => setLayerState(LayerState.NONE)}>Remove Logo</Button>
          </div>
        )
    }
  }

  return (
    <div className="flex flex-col items-center justify-start w-full">
      {/* TODO - change to a custom input field. */}
      <h1><i>{state.name}</i>{' '}<i className="bi bi-pencil-square"></i></h1>
      <HorizontalDivider />
      <WebbingSlider label="Angle" min={-90} max={90} step={1} start={0} init={0} valueDisplay={(num) => `${num} deg`} onChangeFunc={(val) => { stateFuncs.setWebbingAnlge(typeof val == "number" ? val : 0) }} tooltip="The angle that the design is rotated on the webbing." />
      <HorizontalDivider />
      <div className="flex sm:flex-row sm:px-0 px-3 justify-between w-full flex-col">
        <LayerSelect layers={layerIds} selectLayer={(layer) => { setSelectedLayerId(layer); }} className="mb-3 sm:mb-0" />
        <Button endContent={<i className="bi bi-plus-circle-fill"></i>} onPress={() => { const layer = newlayer(); stateFuncs.appendLayer(layer); setSelectedLayerId(layer.id); }}>Add new layer</Button>
      </div>
      {selectedLayerId && selectedLayer != defaultLayer && (
        <div className="w-full mt-2">
          <WebbingSlider label="Horizontal Spacing" min={0} max={50} step={1} init={selectedLayer.hspace} valueDisplay={(num) => `${num}`} onChangeFunc={(val) => { stateFuncs.editLayer(selectedLayerId, "hspace", val) }} tooltip="The horizontal space between elements in this layer." />
          <WebbingSlider label="Vertical Spacing" min={0} max={50} step={1} init={selectedLayer.vspace} valueDisplay={(num) => `${num}`} onChangeFunc={(val) => { stateFuncs.editLayer(selectedLayerId, "vspace", val) }} tooltip="The vertical space between other layers and this layer." />
          <WebbingSlider label="Size" min={2} max={200} step={1} init={selectedLayer.size} valueDisplay={(num) => `${num}`} onChangeFunc={(val) => { stateFuncs.editLayer(selectedLayerId, "size", val) }} tooltip="The text font size or the width of the image on the webbing." />
          <WebbingSlider label="Row Offset" min={1} max={10} step={1} init={selectedLayer.rowoff} valueDisplay={(num) => `${num} rows`} onChangeFunc={(val) => { stateFuncs.editLayer(selectedLayerId, "rowoff", val) }} tooltip="How many rows it takes for this layer to repeat itself. (WARNING can cause design to become non-repeating)" />
          {/* TODO : if you drag picker it re-renders webbing multiple times. */}
          <Input size="md" type="color" label="Background Color" variant="flat" placeholder={selectedLayer.bgColor} onValueChange={(val) => setLayerBackground(val)} classNames={{ base: "max-w-lg my-3", label: "text-lg" }} defaultValue={selectedLayer.bgColor} value={selectedLayer.bgColor} />
          <div className="flex flex-col sm:flex-row justify-around w-full mt-2 px-3 sm:px-0">
            <Button startContent={<i className="bi bi-fonts"></i>} className="mb-3 sm:mb-0" onPress={() => setLayerState(LayerState.TEXT)}>Use Text</Button>
            <Button startContent={<i className="bi bi-image"></i>} onPress={() => setLayerState(LayerState.LOGO)}>Use Logo</Button>
          </div>
          {renderAdvancedEditor() || <Button color="danger" className="w-full mt-3" onPress={() => stateFuncs.removeLayer(selectedLayerId)}>Remove Layer</Button>}
        </div>
      )}
    </div>
  );
}

interface FontSelectProps {
  changeFont: (arg0: WebbingFonts) => void,
  font: WebbingFonts,
  className: string
}


function FontSelect(props: FontSelectProps) {
  const availableFonts: WebbingFonts[] = allWebbingFonts();

  const [selectedFont, setSelected] = useState<WebbingFonts>(props.font);

  const handleSelect = (val: SharedSelection) => {
    const value = stringToFontEnum(val.currentKey ? val.currentKey : "")
    setSelected(value);
    props.changeFont(value);
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          className={`capitalize ${props.className}`}
        >
          {fontEnumToString(selectedFont)}
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label="Layer selection"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedFont.toString()}
        // onSelectionChange={handleSelected}
        onSelectionChange={handleSelect}
      >
        {availableFonts.map((item) => {
          return (
            <DropdownItem key={item}>{fontEnumToString(item)}</DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  )
}


interface LayerSelectProps {
  layers: string[],
  className?: string,
  selectLayer: (arg0: string) => void
}

function LayerSelect({ layers, selectLayer, className = "" }: LayerSelectProps) {
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
          className={`capitalize ${className}`}
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

interface ImageUploadProps {
  setImageData: (arg0: string) => void
}

function ImageUpload(props: ImageUploadProps) {

  const onUpload = (image: File | null) => {
    if (!image) return;

    // check if the file selected is not an image file
    if (!image.type.includes('image')) {
      return alert('Only images are allowed!');
    }

    // check if size (in bytes) exceeds 10 MB
    if (image.size > 10_000_000) {
      return alert('Maximum upload size is 10MB!');
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(image);

    fileReader.onload = (fileReaderEvent) => {
      props.setImageData(typeof fileReaderEvent.target?.result == "string" ? fileReaderEvent.target.result : "")
    }
  }
  return (
    <Input type="file" accept="image/*" onChange={(val) => onUpload(val.target.files ? val.target.files[0] : null)} />
  )
}