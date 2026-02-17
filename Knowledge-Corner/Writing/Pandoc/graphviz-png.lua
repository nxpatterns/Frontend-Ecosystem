local dotPath = os.getenv("DOT") or "dot"

local function graphviz(code)
    -- Direct PNG conversion with high DPI
    local png = pandoc.pipe(dotPath, {"-Tpng", "-Gdpi=300"}, code)
    local hash = pandoc.sha1(code)
    local filename = "graphviz-" .. hash .. ".png"

    local f = io.open(filename, 'wb')
    f:write(png)
    f:close()

    pandoc.mediabag.insert(filename, "image/png", png)

    return pandoc.Para{
        pandoc.Image({}, filename, "")
    }
end

function CodeBlock(block)
    if block.classes[1] ~= "graphviz" then
        return nil
    end

    local success, result = pcall(graphviz, block.text)
    if not success then
        io.stderr:write(tostring(result))
        error('Graphviz conversion failed')
    end

    return result
end

return {
    {CodeBlock = CodeBlock}
}
