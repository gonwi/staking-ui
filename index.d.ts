declare namespace React {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // React-specific Attributes
    defaultChecked?: boolean | undefined
    defaultValue?: string | number | readonly string[] | undefined
    suppressContentEditableWarning?: boolean | undefined
    suppressHydrationWarning?: boolean | undefined

    // Standard HTML Attributes
    accessKey?: string | undefined
    autoFocus?: boolean | undefined
    className?: string | undefined
    contentEditable?: Booleanish | 'inherit' | 'plaintext-only' | undefined
    contextMenu?: string | undefined
    dir?: string | undefined
    draggable?: Booleanish | undefined
    hidden?: boolean | undefined
    id?: string | undefined
    lang?: string | undefined
    nonce?: string | undefined
    slot?: string | undefined
    spellCheck?: Booleanish | undefined
    style?: CSSProperties | undefined
    tabIndex?: number | undefined
    title?: string | undefined
    translate?: 'yes' | 'no' | undefined

    // Unknown
    radioGroup?: string | undefined // <command>, <menuitem>

    // WAI-ARIA
    role?: AriaRole | undefined

    // RDFa Attributes
    about?: string | undefined
    content?: string | JSX.Element | undefined
    datatype?: string | undefined
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    inlist?: any
    prefix?: string | undefined
    property?: string | undefined
    rel?: string | undefined
    resource?: string | undefined
    rev?: string | undefined
    typeof?: string | undefined
    vocab?: string | undefined

    // Non-standard Attributes
    autoCapitalize?: string | undefined
    autoCorrect?: string | undefined
    autoSave?: string | undefined
    color?: string | undefined
    itemProp?: string | undefined
    itemScope?: boolean | undefined
    itemType?: string | undefined
    itemID?: string | undefined
    itemRef?: string | undefined
    results?: number | undefined
    security?: string | undefined
    unselectable?: 'on' | 'off' | undefined

    // Living Standard
    /**
     * Hints at the type of data that might be entered by the user while editing the element or its contents
     * @see {@link https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute}
     */
    inputMode?:
      | 'none'
      | 'text'
      | 'tel'
      | 'url'
      | 'email'
      | 'numeric'
      | 'decimal'
      | 'search'
      | undefined
    /**
     * Specify that a standard HTML element should behave like a defined custom built-in element
     * @see {@link https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is}
     */
    is?: string | undefined
  }
}
