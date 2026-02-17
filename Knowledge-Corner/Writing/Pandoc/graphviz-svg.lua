local dotPath = os.getenv("DOT") or "dot"

local function graphviz(code)
   -- Change to SVG output
   local svg = pandoc.pipe(dotPath, {"-Tsvg"}, code)
   local hash = pandoc.sha1(code)
   local filename = "graphviz-" .. hash .. ".svg"

   local f = io.open(filename, 'wb')
   f:write(svg)
   f:close()

   pandoc.mediabag.insert(filename, "image/svg+xml", svg)

   local result = pandoc.Para {
       pandoc.Image({}, filename)
   }

   -- Delete the temporary file
   os.remove(filename)

   return result
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
